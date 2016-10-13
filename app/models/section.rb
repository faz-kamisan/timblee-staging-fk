class Section < ActiveRecord::Base
  STATES = ['active', 'archived', 'resolved']

  belongs_to :sitemap, touch: true
  has_many :pages
  # moving to method instead of association due to complexity
  # has_one :root_page, ->{ where(alt_section_id: id) }, class_name: :Page, forign_key: :alt_section_id, dependent: :destroy

  validates :name, :sitemap, presence: true
  validates :state, inclusion: { in: STATES }

  before_update :archive_pages, if: :state_changed?

  before_destroy :unlink_root_page

  def duplicate(duplicate_sitemap)
    duplicate = dup
    duplicate.sitemap = duplicate_sitemap
    duplicate.save
    root_page.duplicate(duplicate, nil)
  end

  def root_page
    if(default?)
      pages.find_by(parent_id: nil)
    else
      sitemap.pages.find_by(alt_section_id: id)
    end
  end

  def get_page_tree
    root_page ? root_page.get_tree(sitemap.pages.includes(:page_type, :comments)) : {}
  end

  def to_react_data
    { id: id,
      name: name,
      default: default,
      state: state,
      pageTree: (default ? get_page_tree : nil)
    }
  end

  private

    def archive_pages
      if(state == 'archived')
        pages.update_all(state: 'archived')
      end
    end

  def unlink_root_page
    root_page.update(alt_section_id: nil)
  end
end
