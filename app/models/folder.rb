class Folder < ActiveRecord::Base
  belongs_to :business
  has_many :site_maps, dependent: :destroy
  validates :name, :business, presence: true
  validates :name, uniqueness: { scope: :business_id, case_sensitive: false }

  strip_fields :name

  scope :order_by_lower_name, -> { order('lower(name)') }
end
