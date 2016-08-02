class User < ActiveRecord::Base

  devise :invitable, :database_authenticatable, :registerable, :recoverable, :rememberable, :trackable, :validatable

  belongs_to :business, autosave: true

  has_many :site_map_invites, dependent: :destroy
  has_many :shared_site_maps, through: :site_map_invites, source: :site_map

  after_create :add_business, unless: :business_id

  validates :full_name, presence: true

  def all_site_maps
    (business.site_maps + shared_site_maps).sort_by {|site_map| site_map.name.capitalize }
  end

  private

    def add_business
      new_business = create_business!(owner_id: self.id)
      self.update(business_id: business.id)
    end
end
