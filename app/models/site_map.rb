class SiteMap < ActiveRecord::Base

  LENGTH_TO_TRUNCATE = 40

  belongs_to :folder
  belongs_to :business
  has_many :pages, dependent: :destroy
  has_many :site_map_invites, dependent: :destroy
  has_many :invited_users, through: :site_map_invites, source: :user

  validates :business, :name, presence: true
  validates :state, inclusion: { in: ['on_hold', 'in_progress', 'in_review', 'approved'] }
  validates :name, uniqueness: { scope: :business_id, case_sensitive: false }

  before_validation :set_state_to_in_progress, on: :create
  strip_fields :name

  scope :on_hold, -> { where(state: 'on_hold') }
  scope :in_progress, -> { where(state: 'in_progress') }
  scope :in_review, -> { where(state: 'in_review') }
  scope :approved, -> { where(state: 'approved') }


  private
    def set_state_to_in_progress
      self.state = 'in_progress'
    end

end
