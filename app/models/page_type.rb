class PageType < ActiveRecord::Base
  has_many :pages, dependent: :restrict_with_error

  validates :name, presence: true
end
