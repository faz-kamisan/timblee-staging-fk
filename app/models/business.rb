class Business < ActiveRecord::Base
  belongs_to :owner, class_name: :User

  has_many :users, dependent: :destroy
  has_many :folders, dependent: :destroy
  has_many :sitemaps, dependent: :destroy
  has_many :subscriptions, dependent: :destroy
  has_one :active_subscription, ->{ where('subscriptions.end_at >= :today and subscriptions.start_at <= :today', { today: Time.current}) }, class_name: :Subscription
  has_one :plan, through: :active_subscription
  delegate :no_of_users, to: :active_subscription

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
    in_trial_period? && !plan
  end

  def is_pro_plan?
    plan.try(:stripe_plan_id) == PRO_STRIPE_ID
  end

  def is_starter_plan?
    plan.try(:stripe_plan_id) == STARTER_STRIPE_ID
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
end
