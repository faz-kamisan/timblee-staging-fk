class Section < ActiveRecord::Base
  STATES = ['active', 'archived', 'resolved']

  belongs_to :sitemap, touch: true
  has_many :pages
  has_one :root_page, ->{ where(parent_id: nil) }, class_name: :Page, dependent: :destroy

  validates :name, :sitemap, presence: true
  validates :name, uniqueness: { scope: :sitemap_id }
  validates :state, inclusion: { in: STATES }

  before_update :archive_pages, if: :state_changed?

  # before_destroy :destroy_root_page

  # attr_accessor :really_destroy_root_page

  def duplicate(duplicate_sitemap)
    duplicate = dup
    duplicate.sitemap = duplicate_sitemap
    duplicate.save
    root_page.duplicate(duplicate, nil)
  end

  def get_page_tree
    root_page ? root_page.get_tree(pages.includes(:page_type, :comments)) : {}
  end

  def to_react_data
    { id: id, name: name, default: default, state: state, pageTree: get_page_tree }
  end

  private

    def archive_pages
      if(state == 'archived')
        pages.update_all(state: 'archived')
      end
    end

  # def destroy_root_page
  #   if really_destroy_root_page
  #     root_page.destroy
  #   else
  #     pages.update_all(state: 'archived')
  #   end
  # end
end
