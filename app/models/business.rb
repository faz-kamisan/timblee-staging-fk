class Business < ActiveRecord::Base
  belongs_to :owner, class_name: :User

  has_many :users, dependent: :destroy
  has_many :folders, dependent: :destroy
  has_many :site_maps, dependent: :destroy
end
