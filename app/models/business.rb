class Business < ActiveRecord::Base
  belongs_to :owner, class_name: :User
  has_many :users
  has_many :folders
  has_many :site_maps, through: :folders
end
