class Subscription < ActiveRecord::Base
  belongs_to :plan
  belongs_to :business

  validates :start_date, :end_date, :quantity, :plan, :business, presence: true
end
