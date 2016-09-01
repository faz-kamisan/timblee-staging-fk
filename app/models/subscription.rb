class Subscription < ActiveRecord::Base
  belongs_to :plan
  belongs_to :business

  validates :start_at, :end_at, :plan, :business, presence: true
  validates_date :end_at, on_or_after: :start_at
  validates :quantity, presence: true, if: -> { plan && plan.stripe_plan_id == PRO_STRIPE_ID }

  before_validation :add_start_at_and_end_at, on: :create

  def add_start_at_and_end_at
    self.start_at = business.in_trial_period? ? business.trial_end_at : Time.current
    self.end_at = start_at + 1.month
  end

  def in_future?
    start_at > Time.current && end_at > Time.current
  end

  def active?
    start_at < Time.current && end_at > Time.current
  end
end
