class Plan < ActiveRecord::Base
  PRO = 'Pro'
  STARTER1 = 'Starter-1-sitemap'
  STARTER3 = 'Starter-3-sitemaps'
  validates :name, :stripe_plan_id, :cost_in_cents, presence: true

  has_many :subscriptions, dependent: :nullify

end
