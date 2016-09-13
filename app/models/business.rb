class Business < ActiveRecord::Base
  belongs_to :owner, class_name: :User

  has_many :users, dependent: :destroy
  has_many :folders, dependent: :destroy
  has_many :sitemaps, dependent: :destroy
  has_many :subscriptions, dependent: :destroy
  has_many :cards, dependent: :destroy
  has_one :current_subscription, ->{ where('subscriptions.end_at >= :today', { today: Time.current }) }, class_name: :Subscription
  has_one :active_card, -> { order(created_at: :desc) }, class_name: :Card

  delegate :no_of_users, to: :current_subscription

  def active_subscription
    current_subscription if current_subscription.active?
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

  def in_trial_period?
    trial_end_at > Time.current
  end

  def in_trial_period_without_any_plan?
    in_trial_period? && !has_plan
  end

  def is_pro_plan?
    is_pro
  end

  def is_starter_plan?
    !is_pro && (has_plan || !in_trial_period?)
  end

  def allow_downgrade_to_starter?
    users.count == 1 && sitemaps.count <= 3
  end

  def monthly_charge
    if is_pro_plan?
      CHARGE_FOR_OWNER + (CHARGE_FOR_OTHER_USERS * (no_of_users - 1))
    else
      0
    end
  end

  def allow_more_sitemaps?
    is_pro_plan? || in_trial_period? || sitemaps.count < 3
  end

  def self.monthly_charge(no_of_users)
    CHARGE_FOR_OWNER + (CHARGE_FOR_OTHER_USERS * (no_of_users - 1))
  end

  def to_react_data
    {
      id: id,
      logo: logo,
      name: name,
      users: users.map(&:to_react_data)
    }
  end
end
