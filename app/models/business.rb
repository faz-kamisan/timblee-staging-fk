class Business < ActiveRecord::Base
  belongs_to :owner, class_name: :User

  has_many :users, dependent: :destroy
  has_many :folders, dependent: :destroy
  has_many :site_maps, dependent: :destroy
  has_many :subscriptions, dependent: :destroy
  has_one :active_subscription, ->{ where('subscriptions.end_date >= :todays_date and subscriptions.start_date <= :todays_date', { todays_date: Date.today }) }, class_name: :Subscription, dependent: :destroy
  has_one :plan, through: :active_subscription
  delegate :no_of_users, to: :active_subscription

  def invited_users
    users.where.not(invitation_token: nil)
  end

  def trial_end_date
    created_at.to_date + trial_days.days
  end

  def in_trial_period?
    trial_end_date > Date.current
  end

  def is_pro_plan?
    plan.try(:stripe_plan_id) == PRO_STRIPE_ID
  end

  def is_starter_plan?
    plan.try(:stripe_plan_id) == STARTER_STRIPE_ID
  end

  def monthly_charge
    if is_pro_plan?
      19 + (12 * (no_of_users - 1))
    else
      0
    end
  end
end
