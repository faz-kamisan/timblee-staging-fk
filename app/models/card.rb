class Card < ActiveRecord::Base
  belongs_to :business
  belongs_to :user

  validates :last4, :business, :brand, presence: true
end
