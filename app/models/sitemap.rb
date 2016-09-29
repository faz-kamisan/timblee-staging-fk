class Sitemap < ActiveRecord::Base
  include ::SiteMapTransitions

  LENGTH_TO_TRUNCATE = 44
  DEFAULT_NAME_PREFIX = 'New Sitemap '
  DEFAULT_SECTION_NAME = 'Default'
  GENERAL_PAGE_TYPE_NAME = 'General 1'

  belongs_to :folder
  belongs_to :business
  has_many :pages
  has_many :sections
  has_one :default_section, ->{ where(default: true) }, class_name: :Section
  has_many :sitemap_shared_users, dependent: :destroy
  has_many :comments, as: :commentable

  validates :public_share_token, :business, :name, presence: true
  validates :business, :name, presence: true
  validates :name, uniqueness: { scope: :business_id, case_sensitive: false }
  validates :public_share_token, uniqueness: true
  validate :business_can_have_more_sitemaps, on: :create

  before_validation :set_default_name, on: :create, unless: :name
  before_validation :set_unique_public_share_token, on: :create
  before_destroy :hard_delete_sections_and_pages
  before_validation :set_default_state, on: :create, unless: :state
  after_create :create_default_section_and_page
  strip_fields :name

  scope :order_by_alphanumeric_lower_name, -> { order("SUBSTRING(name FROM '(^[0-9]+)')::BIGINT ASC, lower(name)") }

  def duplicate
    duplicate = dup
    duplicate.set_default_name("Copy of #{name}-")

    Sitemap.skip_callback(:create, :after, :create_default_section_and_page)
    Page.skip_callback(:update, :before, :update_children_section_id)
    Page.skip_callback(:update, :before, :archive_children_pages)
    duplicate.save

    sections.each { |section| section.duplicate(duplicate) }

    Sitemap.set_callback(:create, :after, :create_default_section_and_page)
    Page.set_callback(:update, :before, :update_children_section_id, if: :section_id_changed?)
    Page.set_callback(:update, :before, :archive_children_pages, if: :state_changed?)
    duplicate
  end


  def users
    business.users
  end

  def active_users
    users - User.where(id: users.map(&:id)).invitation_not_accepted
  end

  def to_react_data
    { name: self.name,
      state: state.titleize,
      id: self.id,
      maxPageUid: pages.maximum(:uid),
      updated_at: self.updated_at.strftime('%d %b %Y'),
      pageTypes: PageType.order_by_name,
      footerPages: pages.where(footer: true).map(&:to_react_data),
      comments: self.comments.order_by_created_at.map(&:to_react_data),
      sections: sections.map(&:to_react_data),
      business:  business.to_react_data,
      sharedUsers: sitemap_shared_users
    }
  end

  def set_default_name(default_name = DEFAULT_NAME_PREFIX)
    new_site_map_numbers = self.business.sitemaps.where("name ~* '^"+ default_name +"\\d+$'").pluck(:name).map {|name| name.match(/\d*$/)[0].to_i}.sort
    if(new_site_map_numbers[0] == 1)
      first_unoccupied_number = (new_site_map_numbers.select.with_index { |number, index| number == index + 1 }[-1]) + 1
      self.name = "#{default_name}" + first_unoccupied_number.to_s
    else
      self.name = "#{default_name}1"
    end
  end

  private


    def business_can_have_more_sitemaps
      unless business.allow_more_sitemaps?
        errors.add(:base, 'Can\'t create more sitemaps for current business')
      end
    end

    def create_default_section_and_page
      section = sections.create(name: DEFAULT_SECTION_NAME, default: true)
      section.pages.create(page_type: PageType.find_by_name(GENERAL_PAGE_TYPE_NAME), name: name, sitemap_id: id)
    end

    def set_unique_public_share_token
      self.public_share_token = Digest::SHA1.hexdigest([Time.now, rand].join)[0,10]
    end

    def hard_delete_sections_and_pages
      sections.each do |section|
        section.really_destroy_root_page = true
        section.destroy!
      end
    end
end
