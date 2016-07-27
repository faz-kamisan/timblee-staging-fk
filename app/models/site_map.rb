class SiteMap < ActiveRecord::Base
  belongs_to :folder
  belongs_to :business
  has_many :pages

  validates :business, presence: true
end