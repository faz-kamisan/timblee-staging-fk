class User < ActiveRecord::Base

  devise :invitable, :database_authenticatable, :async, :registerable, :recoverable, :rememberable, :trackable, :validatable, :confirmable

  belongs_to :business

  has_many :site_map_invites, dependent: :destroy
  has_many :shared_site_maps, through: :site_map_invites, source: :site_map
  # mount_uploader :avatar, AvatarUploader
  before_create :create_business, unless: :business
  after_create :set_confirmation_instructions_to_be_sent


  validates :full_name, presence: true
  # validate :minimum_image_size

  def all_site_maps
    (business.site_maps + shared_site_maps).sort_by {|site_map| site_map.name.capitalize }
  end

  private

  def add_business
    build_business(owner_id: self.id)
  end

  def set_confirmation_instructions_to_be_sent
    UserConfirmationMailWorker.perform_at(1.days.from_now, self.id)
    UserConfirmationMailWorker.perform_at(5.days.from_now, self.id)
    UserConfirmationMailWorker.perform_at(10.days.from_now, self.id)
  end

  # def minimum_image_size
  #   image = MiniMagick::Image.open(avatar.path)
  #   unless image[:width] >= 400 && image[:height] >= 400
  #     errors.add :avatar, "should be 400x400px minimum!"
  #   end
  # end
end
