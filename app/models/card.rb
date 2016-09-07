class Card < ActiveRecord::Base
  belongs_to :business

  validates :last4, :business, :brand, presence: true
end
