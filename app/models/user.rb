class User < ActiveRecord::Base
  devise :invitable, :database_authenticatable, :async, :registerable, :recoverable, :rememberable, :trackable, :validatable, :confirmable

  acts_as_paranoid

  belongs_to :business, autosave: true


  has_many :sitemap_invites, dependent: :destroy
  has_many :shared_sitemaps, through: :sitemap_invites, source: :sitemap
  has_many :comments, as: :commenter
  mount_uploader :avatar, AvatarUploader

  before_create :set_is_admin, unless: :business_id
  before_create :add_business, unless: :business_id
  after_create :set_confirmation_instructions_to_be_sent, unless: :confirmed?
  before_destroy :restrict_owner_destroy
  after_destroy :update_business_subscription
  before_update :restrict_owner_role_update, if: :is_admin_changed?
  after_update :mail_user_about_role_update, if: :is_admin_changed?
  after_create :add_default_avatar
  after_invitation_created :add_default_avatar

  strip_fields :full_name

  # remove devise validations
  _validators.delete(:email)
  _validators.delete(:password)
  _validate_callbacks.each do |callback|
    if callback.raw_filter.respond_to? :attributes
      callback.raw_filter.attributes.delete :email
      callback.raw_filter.attributes.delete :password
    end
  end

  # add custom validations
  validates :full_name, presence: { message: 'Hmm... no name? Make something up :)' }
  validates :email, presence: { message: 'We really do need an email. Pretty please.' }
  validates :email, uniqueness: { message: I18n.t('devise.failure.invited') }, allow_blank: true, if: -> { email_changed? && User.find_by_email(email).try(:invitation_not_accepted?) }
  validates :email, uniqueness: { message: "There's already an account linked to this email. Forgot your password? <a href='/users/password/new'>Reset it here</a>." }, allow_blank: true, if: -> { email_changed? && !User.find_by_email(email).try(:invitation_not_accepted?) }
  validates_format_of :email, with: email_regexp, allow_blank: true, if: :email_changed?
  validates :password, presence: { message: 'Without a password, it\'s like leaving your door open to the whole internet.' }, if: :password_required?
  validates :password, confirmation: true, if: :password_required?
  validates :password, length: { within: password_length, message: 'Your password needs to be at least 6 characters.' }, allow_blank: true

  def all_sitemaps
    Sitemap.where(id: business.sitemaps.pluck(:id) + shared_sitemaps.pluck(:id)).order_by_alphanumeric_lower_name
  end

  def invitation_not_accepted?
    invitation_token.present? && invitation_accepted_at.blank?
  end

  def active?
    invitation_token == nil
  end

  def owner?
    business.owner == self
  end

  def to_react_data
    {
      id: id,
      full_name: full_name,
      display: full_name,
      email: email
    }
  end
  protected
    def confirmation_period_valid?
      self.class.allow_unconfirmed_access_for.nil? || (created_at && created_at.utc >= self.class.allow_unconfirmed_access_for.ago)
    end

  private

    def add_default_avatar
      avatar.store!(File.open(File.join(Rails.root, "app/assets/images/avatar_#{[*1..14].sample}.svg")))
      self.save(validate: false)
    end

    def mail_user_about_role_update
      UserMailer.delay_for(10.seconds).send_updated_role_details(id) unless avatar_changed? # in add_default_avatar calling save triggers this callback after_create but it needs to be called only after_update
    end

    def set_is_admin
      self.is_admin = true
    end

    def add_business
      build_business(owner: self, trial_days: DEFAULT_TRIAL_DAYS)
    end

    def set_confirmation_instructions_to_be_sent
      UserConfirmationMailWorker.perform_at(1.days.from_now, self.id)
      UserConfirmationMailWorker.perform_at(5.days.from_now, self.id)
      UserConfirmationMailWorker.perform_at(10.days.from_now, self.id)
    end

    def restrict_owner_destroy
      if owner?
        errors.add(:base, I18n.t('errors.users.owner_destroy'))
        false
      end
    end

    def restrict_owner_role_update
      if owner? && !is_admin
        errors.add(:base, I18n.t('errors.users.owner_role_update'))
        false
      end
    end

    def email_required?
      false
    end

    def update_business_subscription
      if business.is_pro_plan?
        business.current_subscription.update(end_at: Time.current)
        business.subscriptions.build(no_of_users: business.users.count, quantity: Business.monthly_charge(business.users.count))
        StripePaymentService.new(business).update_subscription
      end
    end
end
