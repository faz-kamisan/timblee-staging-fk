class Plan < ActiveRecord::Base
  validates :name, presence: true

  has_many :subscriptions, dependent: :nullify

end
