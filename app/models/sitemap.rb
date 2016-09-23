class Sitemap < ActiveRecord::Base
  include ::SiteMapTransitions

  LENGTH_TO_TRUNCATE = 44
  DEFAULT_NAME_PREFIX = 'New Sitemap'
  DEFAULT_SECTION_NAME = 'Default'
  GENERAL_PAGE_TYPE_NAME = 'General 1'

  belongs_to :folder
  belongs_to :business
  has_many :pages
  has_many :sections, dependent: :destroy
  has_one :default_section, ->{ where(default: true) }, class_name: :Section
  has_many :sitemap_invites, dependent: :destroy
  has_many :invited_users, through: :sitemap_invites, source: :user
  has_many :comments, as: :commentable

  validates :business, :name, presence: true
  validates :name, uniqueness: { scope: :business_id, case_sensitive: false }
  validate :business_can_have_more_sitemaps, on: :create

  before_validation :set_default_state, on: :create
  before_validation :set_default_name, on: :create
  after_create :create_default_section_and_page
  strip_fields :name

  scope :order_by_alphanumeric_lower_name, -> { order("SUBSTRING(name FROM '(^[0-9]+)')::BIGINT ASC, lower(name)") }

  def users
    business.users + invited_users
  end

  def to_react_data
    { name: self.name,
      state: state.titleize,
      id: self.id,
      updated_at: self.updated_at.strftime('%d %b %Y'),
      pageTypes: PageType.order_by_name,
      comments: self.comments.map(&:to_react_data),
      sections: sections.map(&:to_react_data),
    }
  end

  private


    def business_can_have_more_sitemaps
      unless business.allow_more_sitemaps?
        errors.add(:base, 'Can\'t create more sitemaps for current business')
      end
    end

    def set_default_name
      new_site_map_numbers = self.business.sitemaps.where("name ILIKE 'new sitemap%'").pluck(:name).map {|name| name.match(/\d*$/)[0].to_i}.sort
      max = new_site_map_numbers[-1] || 0
      self.name = "#{DEFAULT_NAME_PREFIX} " + ((1..max + 1).to_a - new_site_map_numbers).first.to_s
    end

    def create_default_section_and_page
      section = sections.create(name: DEFAULT_SECTION_NAME, default: true)
      section.pages.create(page_type: PageType.find_by_name(GENERAL_PAGE_TYPE_NAME), name: name, sitemap_id: id)
    end

end
