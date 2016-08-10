class Plan < ActiveRecord::Base
  validates :name, presence: true

  has_many :subscriptions, dependent: :nullify

  PRO_ID = 1
  STARTER_ID = 2
end
