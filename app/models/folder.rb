class Folder < ActiveRecord::Base
  belongs_to :business
  has_many :site_maps, dependent: :destroy
  validates :name, :business, presence: true
  validates :name, uniqueness: { scope: :business_id, case_sensitive: false }

  before_validation :check_name_is_not_all_site_maps
  strip_fields :name

  scope :order_by_lower_name, -> { order('lower(name)') }

  private
    def check_name_is_not_all_site_maps
      if self.name && self.name.squeeze(' ').downcase == 'all sitemaps'
        errors.add(:name, "has already been taken")
      end
    end
end
