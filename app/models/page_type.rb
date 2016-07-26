class PageType < ActiveRecord::Base
  has_many :pages
  
  validates :name, presense: true
end