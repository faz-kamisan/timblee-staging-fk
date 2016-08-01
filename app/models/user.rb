class User < ActiveRecord::Base

  devise :invitable, :database_authenticatable, :registerable, :recoverable, :rememberable, :trackable, :validatable

  belongs_to :business

  has_many :site_map_invites, dependent: :destroy
  has_many :shared_site_maps, through: :site_map_invites, source: :site_map
  mount_uploader :avatar, AvatarUploader

  before_create :create_business, unless: :business

  validates :full_name, presence: true
  validate :minimum_image_size

  def all_site_maps
    (business.site_maps + shared_site_maps).sort_by(&:name)
  end

  private

  def add_business
    build_business(owner_id: self.id)
  end

  def minimum_image_size
    image = MiniMagick::Image.open(avatar.path)
    unless image[:width] >= 400 && image[:height] >= 400
      errors.add :avatar, "should be 400x400px minimum!"
    end
  end
end
