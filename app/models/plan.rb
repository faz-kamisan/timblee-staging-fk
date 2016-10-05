class Plan < ActiveRecord::Base
  PRO = 'Pro'
  STARTER = 'Starter'
  validates :name, :stripe_plan_id, :cost_in_cents, presence: true

  has_many :subscriptions, dependent: :nullify

end
