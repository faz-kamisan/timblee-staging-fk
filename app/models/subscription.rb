class Subscription < ActiveRecord::Base
  belongs_to :plan
  belongs_to :business

  validates :start_date, :end_date, :plan, :business, presence: true
  validates_date :end_date, on_or_after: :start_date
  validates :quantity, presence: true, if: -> { plan.stripe_plan_id == PRO_STRIPE_ID }

  before_validation :add_start_date_and_end_date, on: :create

  def add_start_date_and_end_date
    self.start_date = Date.current
    self.end_date = Date.current + 1.month - 1.day
  end
end
