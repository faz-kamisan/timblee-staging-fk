class Folder < ActiveRecord::Base
  belongs_to :business
  has_many :sitemaps, dependent: :destroy
  validates :name, :business, presence: true
  validates :name, uniqueness: { scope: :business_id, case_sensitive: false }

  before_validation :check_name_is_not_all_sitemaps
  strip_fields :name

  scope :order_by_alphanumeric_lower_name, -> { order("SUBSTRING(name FROM '(^[0-9]+)')::BIGINT ASC, lower(name)") }

  def seed_folder(new_business)
    duplicate = new_business.folders.create(name: name) if persisted?
    original_sitemaps = persisted? ? sitemaps : business.sitemaps.where(folder_id: nil)

    original_sitemaps.each do |sitemap|
      sitemap.seed_sitemap(duplicate, new_business)
    end
  end

  private
    def check_name_is_not_all_sitemaps
      if self.name && self.name.squeeze(' ').downcase == 'all sitemaps'
        errors.add(:name, I18n.t(:taken, scope: [:errors, :messages]))
      end
    end
end
