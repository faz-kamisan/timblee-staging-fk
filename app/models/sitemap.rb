class Sitemap < ActiveRecord::Base

  LENGTH_TO_TRUNCATE = 44

  belongs_to :folder
  belongs_to :business
  has_many :pages, dependent: :destroy
  has_one :root_page, ->{ where(parent_id: nil) }, class_name: :Page
  has_many :sitemap_invites, dependent: :destroy
  has_many :invited_users, through: :sitemap_invites, source: :user
  has_many :comments, as: :commentable

  validates :business, :name, presence: true
  validates :state, inclusion: { in: ['on_hold', 'in_progress', 'in_review', 'approved'] }
  validates :name, uniqueness: { scope: :business_id, case_sensitive: false }
  validate :business_can_have_more_sitemaps

  before_validation :set_state_to_in_progress, on: :create
  strip_fields :name

  scope :on_hold, -> { where(state: 'on_hold') }
  scope :in_progress, -> { where(state: 'in_progress') }
  scope :in_review, -> { where(state: 'in_review') }
  scope :approved, -> { where(state: 'approved') }
  scope :order_by_alphanumeric_lower_name, -> { order("SUBSTRING(name FROM '(^[0-9]+)')::BIGINT ASC, lower(name)") }

  def get_page_tree
    root_page ? root_page.get_tree(pages.includes(:page_type, :comments)) : {}
  end

  def to_react_data
    { name: self.name,
      id: self.id,
      pageTypes: PageType.all,
      comments: self.comments.map(&:to_react_data),
      pageTree: get_page_tree
    }
  end

  private
    def set_state_to_in_progress
      self.state = 'in_progress'
    end

    def business_can_have_more_sitemaps
      unless business.allow_more_sitemaps?
        errors.add(:base, 'Can\'t create more sitemaps for current business')
      end
    end

end
