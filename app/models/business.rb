class Business < ActiveRecord::Base

  belongs_to :owner, class_name: :User

  has_many :users, dependent: :destroy
  has_many :folders, dependent: :destroy
  has_many :sitemaps, dependent: :destroy
  has_many :subscriptions, dependent: :destroy
  has_many :cards, dependent: :destroy
  has_one :current_subscription, ->{ where('subscriptions.end_at >= :today', { today: Time.current }) }, class_name: :Subscription
  has_one :active_card, -> { order(created_at: :desc) }, class_name: :Card
  after_create :create_initial_subscription
  after_commit :create_default_sitemaps, on: :create

  mount_uploader :logo, AvatarUploader

  def create_default_sitemaps
    BusinessDefaultSitemapsService.new(self).add_default_sitemaps
  end

  def account_locked?
    !in_trial_period? && !(has_plan && cards.present?)
  end

  def no_of_users
    users.count
  end

  def in_trial_without_plan_for_less_than_10_days?
    in_trial_period_without_any_card? && trial_end_at < Time.current + 10.days
  end

  def free_sitemaps_count_in_words
    "#{free_sitemaps_count.humanize} #{'sitemap'.pluralize(free_sitemaps_count)}"
  end

  def active_subscription
    current_subscription if current_subscription.active?
  end

  def comments_count
    sitemaps.includes(:comments, :page_comments).inject(0){|sum, s| sum + s.all_comments_count }
  end

  def future_subscription
    current_subscription if current_subscription.in_future?
  end

  def invited_users
    users.where.not(invitation_token: nil)
  end

  def trial_end_at
    created_at + trial_days.days
  end

  def days_till_trial_end
    trial_days - ((Time.current - created_at)/86400).to_i
  end

  def in_trial_period?
    trial_end_at > Time.current
  end

  def in_trial_period_without_any_plan?
    in_trial_period? && !has_plan
  end

  def in_trial_period_without_any_card?
    in_trial_period? && !cards.present?
  end

  def plan_name
    is_pro ? Plan::PRO : has_plan ? Plan::STARTER : nil
  end

  def is_pro_plan?
    is_pro
  end

  def is_starter_plan?
    !is_pro && (has_plan || !in_trial_period?)
  end

  def allow_downgrade_to_starter?
    in_trial_period? || (users.count == 1 && sitemaps.count <= free_sitemaps_count)
  end

  def monthly_charge
    if is_pro_plan?
      Business.monthly_charge(no_of_users)
    else
      0
    end
  end

  def allow_more_sitemaps
    if is_pro_plan? || sitemaps.count < free_sitemaps_count || (in_trial_period? && !has_plan)
      'yes'
    elsif in_trial_period?
      'warn'
    else
      'no'
    end
  end

  def allow_more_sitemaps?
    is_pro_plan? || in_trial_period? || sitemaps.count < free_sitemaps_count
  end

  def self.monthly_charge(no_of_users)
    CHARGE_FOR_OWNER + (CHARGE_FOR_OTHER_USERS * (no_of_users - 1))
  end

  def to_react_data
    {
      id: id,
      logo: logo,
      name: name,
      users: users.active.map(&:to_react_data)
    }
  end

  def set_new_subscription(emails, user)
    new_users_count = users.count + InvitationService.get_invitable_users_count(emails)
    subscriptions.build(no_of_users: new_users_count, quantity: Business.monthly_charge(new_users_count), user: user)
    assign_attributes(is_pro: true, has_plan: true)
  end

  def force_destroy
    ActiveRecord::Base.transaction do
      self.owner.force_destroy = true
      self.owner.destroy
      self.destroy
    end
  end

  private

    def create_initial_subscription
      assign_attributes(is_pro: true, has_plan: true)
      subscriptions.build(no_of_users: 1, quantity: Business.monthly_charge(1), user: owner)
      StripePaymentService.new(self).create_customer_with_initial_subscription
    end
end
