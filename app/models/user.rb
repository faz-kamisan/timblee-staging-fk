class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :invitable, :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable
  belongs_to :business
  has_many :folders, dependent: :destroy
  has_many :site_map_invites
  has_many :shared_site_maps, through: :site_map_invites, source: :site_map

  before_create :create_business, unless: :business

  validates :full_name, presence: true

  def all_site_maps
    (business.site_maps + shared_site_maps).sort_by(&:name)
  end

  private
    def create_business
      business = Business.create(owner_id: self.id)
      self.business_id = business.id
    end
end
