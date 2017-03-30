class Sitemap < ActiveRecord::Base
  include ::SiteMapTransitions

  attr_accessor :skip_callback

  LENGTH_TO_TRUNCATE = 44
  DEFAULT_NAME_PREFIX = 'New Sitemap '
  DEFAULT_SECTION_NAME = 'Main sitemap'
  GENERAL_PAGE_TYPE_NAME = 'General 1'
  TRIAL_SITEMAP_TTL = 24.hours

  belongs_to :folder
  belongs_to :user
  belongs_to :business
  has_many :userflows, dependent: :destroy
  has_many :pages, dependent: :delete_all
  has_many :sections, dependent: :delete_all
  has_one :default_section, ->{ where(default: true) }, class_name: :Section
  has_many :sitemap_shared_users, dependent: :delete_all
  has_many :comments, as: :commentable, dependent: :delete_all
  has_many :page_comments, source: :comments, through: :pages
  has_many :guests_sitemaps, dependent: :delete_all
  has_many :guests, through: :guests_sitemaps

  acts_as_list scope: [:state, :business_id]

  validates :public_share_token, :name, presence: true
  validates :business, presence: true, unless: :trial?
  validates :name, uniqueness: { scope: :business_id, case_sensitive: false }, unless: :trial?
  validates :public_share_token, uniqueness: true
  validate :business_can_have_more_sitemaps, on: :create, unless: :trial?

  before_validation :set_default_name, on: :create, unless: :name
  before_validation :set_unique_public_share_token, on: :create
  before_destroy :delete_page_comments_association, prepend: true
  before_validation :set_default_state, on: :create, unless: :state
  after_create :create_default_section_and_page, unless: :skip_callback

  strip_fields :name

  scope :order_by_alphanumeric_lower_name, -> { order("lower(SUBSTRING(name FROM '([^0-9]+)')) ASC, SUBSTRING(name FROM '[0-9]+$')::BIGINT ASC, lower(name)") }

  def duplicate(name = nil)
    duplicate = dup
    duplicate.name = name || duplicate.set_default_name("Copy of #{self.name}-")

    duplicate.skip_callback = true
    duplicate.save

    sections.order(:default).each { |section| section.duplicate(duplicate) }
    footer_pages.each { |footer_page| footer_page.duplicate(nil, nil, duplicate) }

    duplicate
  end

  def footer_pages
    pages.where(footer: true)
  end

  def max_level_one_page_count
    sections.map{|s| s.level_one_pages}.max
  end

  def all_comment_ids
    page_comment_ids + comment_ids
  end

  def all_comments_count
    all_comment_ids.size
  end

  def users
    business.users
  end

  def active_users
    unless trial?
      users - User.where(id: users.map(&:id)).invitation_not_accepted
    end
  end

  def to_react_data
    { name: self.name,
      state: state.titleize,
      id: self.id,
      maxPageUid: pages.maximum(:uid),
      updated_at: self.updated_at.strftime('%d %b %Y'),
      createdAt: self.created_at.to_f * 1000,
      pageTypes: PageType.order_by_name,
      footerPages: pages.where(footer: true).map(&:to_react_data),
      comments: self.comments.order_by_created_at.map(&:to_react_data),
      sections: sections.order(:created_at).map(&:to_react_data),
      business:  business && business.to_react_data,
      sharedUsers: sitemap_shared_users,
      activeSectionId: default_section.id,
      trial: trial,
      guestUsers: guests.map(&:to_react_data)
    }
  end

  def set_default_name(default_name = DEFAULT_NAME_PREFIX)
    if trial?
      self.name = "#{default_name}1"
    else
      new_site_map_numbers = self.business.sitemaps.where("name ~* ?", "^#{default_name}\\d+$").pluck(:name).map {|name| name.match(/\d*$/)[0].to_i}.sort
      if(new_site_map_numbers[0] == 1)
        first_unoccupied_number = (new_site_map_numbers.select.with_index { |number, index| number == index + 1 }[-1]) + 1
        self.name = "#{default_name}" + first_unoccupied_number.to_s
      else
        self.name = "#{default_name}1"
      end
    end
  end

  def public_share_url
    subdomain, host = case Rails.env
                      when 'development' then ['share',         'timblee.dev']
                      when 'staging'     then ['share-staging', 'timblee.io']
                      when 'prep'        then ['share-prep',    'timblee.io']
                      when 'production'  then ['share',         'timblee.io']
                      end

    options = { subdomain: subdomain, host: host }

    options.merge!(port: '3000')      if Rails.env.development?
    options.merge!(protocol: 'https') if Rails.env.production?


    Rails.application.routes.url_helpers.sitemap_public_share_url(public_share_token, options)
  end

  private

    def business_can_have_more_sitemaps
      unless business.allow_more_sitemaps?
        errors.add(:base, "Could not duplicate the sitemap since you've reached your plan's limit of #{business.free_sitemaps_count_in_words}.")
      end
    end

    def create_default_section_and_page
      section = sections.create(name: DEFAULT_SECTION_NAME, default: true)
      section.pages.create(page_type: PageType.find_by_name(GENERAL_PAGE_TYPE_NAME), name: name, sitemap_id: id)
    end

    def set_unique_public_share_token
      self.public_share_token = Digest::SHA1.hexdigest([Time.now, rand].join)[0,10]
    end

    def delete_page_comments_association
      Comment.where(commentable_type: :Page, commentable_id: pages.pluck(:id)).delete_all
    end
end
