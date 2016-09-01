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

  before_validation :set_state_to_in_progress, on: :create
  before_validation :set_name_to_new_sitemap, on: :create
  after_create :create_first_page
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

    def set_name_to_new_sitemap
      new_site_map_numbers = Sitemap.where("name ILIKE 'new sitemap%'").pluck(:name).map {|name| name.match(/\d*$/)[0].to_i}.sort
      if(new_site_map_numbers[0] == 1)
        first_unoccupied_number = (new_site_map_numbers.select.with_index { |number, index| number == index + 1 }[-1]) + 1
        self.name = 'New Sitemap ' + first_unoccupied_number.to_s
      else
        self.name = 'New Sitemap 1'
      end
    end

    def create_first_page
      pages.create(page_type: PageType.first, name: name)
    end

end
