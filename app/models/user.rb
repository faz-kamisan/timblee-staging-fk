class User < ActiveRecord::Base

  devise :invitable, :database_authenticatable, :async, :registerable, :recoverable, :rememberable, :trackable, :validatable, :confirmable

  acts_as_paranoid

  belongs_to :business, autosave: true

  has_many :site_map_invites, dependent: :destroy
  has_many :shared_site_maps, through: :site_map_invites, source: :site_map
  # mount_uploader :avatar, AvatarUploader

  before_create :set_is_admin, unless: :business_id
  before_create :add_business, unless: :business_id
  after_create :set_confirmation_instructions_to_be_sent
  before_destroy :restrict_owner_destroy

  strip_fields :full_name

  validates :full_name, presence: true
  # validate :minimum_image_size

  def all_site_maps
    (business.site_maps + shared_site_maps).sort_by {|site_map| site_map.name.capitalize }
  end

  def active?
    invitation_token == nil
  end

  private
    # def minimum_image_size
    #   image = MiniMagick::Image.open(avatar.path)
    #   unless image[:width] >= 400 && image[:height] >= 400
    #     errors.add :avatar, "should be 400x400px minimum!"
    #   end
    # end

    def set_is_admin
      self.is_admin = true
    end
    def add_business
      build_business(owner: self)
    end

    def set_confirmation_instructions_to_be_sent
      UserConfirmationMailWorker.perform_at(1.days.from_now, self.id)
      UserConfirmationMailWorker.perform_at(5.days.from_now, self.id)
      UserConfirmationMailWorker.perform_at(10.days.from_now, self.id)
    end

    def restrict_owner_destroy
      if business.owner == self
        errors.add(:base, I18n.t('errors.users.owner_destroy'))
        false
      end
    end
end
