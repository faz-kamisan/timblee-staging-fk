class Sitemap < ActiveRecord::Base

  LENGTH_TO_TRUNCATE = 44

  belongs_to :folder
  belongs_to :business
  has_many :pages, dependent: :destroy
  has_many :sitemap_invites, dependent: :destroy
  has_many :invited_users, through: :sitemap_invites, source: :user

  validates :business, :name, presence: true
  validates :state, inclusion: { in: ['on_hold', 'in_progress', 'in_review', 'approved'] }
  validates :name, uniqueness: { scope: :business_id, case_sensitive: false }

  before_validation :set_state_to_in_progress, on: :create
  strip_fields :name

  scope :on_hold, -> { where(state: 'on_hold') }
  scope :in_progress, -> { where(state: 'in_progress') }
  scope :in_review, -> { where(state: 'in_review') }
  scope :approved, -> { where(state: 'approved') }
  scope :order_by_alphanumeric_lower_name, -> { order("SUBSTRING(name FROM '(^[0-9]+)')::BIGINT ASC, lower(name)") }

  private
    def set_state_to_in_progress
      self.state = 'in_progress'
    end

end
