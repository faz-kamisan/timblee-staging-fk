class PageType < ActiveRecord::Base
  has_many :pages, dependent: :restrict_with_error

  validates :name, presence: true

  scope :order_by_name, -> { order("name='General 1' DESC, name='General 2' DESC, name ASC") }
end
