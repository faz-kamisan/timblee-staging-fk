class Folder < ActiveRecord::Base
  belongs_to :business
  has_many :site_maps, dependent: :destroy
  validates :name, :business, presence: true
  validates :name, uniqueness: { scope: :business_id }
end