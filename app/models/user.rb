class User < ActiveRecord::Base
  devise :invitable, :database_authenticatable, :async, :registerable, :recoverable, :rememberable, :trackable, :validatable, :confirmable

  acts_as_paranoid

  belongs_to :business, autosave: true

  has_many :sitemap_invites, dependent: :destroy
  has_many :shared_sitemaps, through: :sitemap_invites, source: :sitemap
  # mount_uploader :avatar, AvatarUploader

  before_create :set_is_admin, unless: :business_id
  before_create :add_business, unless: :business_id
  after_create :set_confirmation_instructions_to_be_sent
  before_destroy :restrict_owner_destroy
  before_update :restrict_owner_role_update, if: :is_admin_changed?

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
  validates :email, uniqueness: { message: "There's already an account linked to this email. Forgot your password? <a href='/users/password/new'>Reset it here</a>." }, allow_blank: true, if: :email_changed?
  validates_format_of     :email, with: email_regexp, allow_blank: true, if: :email_changed?

  validates :password, presence: { message: 'Without a password, it\'s like leaving your door open to the whole internet.' }
  validates :password, length: { within: password_length, message: 'Your password needs to be at least 6 characters.' }, allow_blank: true
  # validate :minimum_image_size

  def all_sitemaps
    (business.sitemaps + shared_sitemaps).sort_by {|sitemap| sitemap.name.capitalize }
  end

  def active?
    invitation_token == nil
  end

  def owner?
    business.owner == self
  end

  private
    # def minimum_image_size
    #   image = MiniMagick::Image.open(avatar.path)
    #   unless image[:width] >= 400 && image[:height] >= 400
    #     errors.add :avatar, "should be 400x400px minimum!"
    #   end
    # end

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
      if owner?
        errors.add(:base, I18n.t('errors.users.owner_role_update'))
        false
      end
    end

    def email_required?
      false
    end

    def password_required?
      false
    end
end
