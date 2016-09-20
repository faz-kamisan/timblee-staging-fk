class Section < ActiveRecord::Base
  belongs_to :sitemap
  has_many :pages
  has_one :root_page, ->{ where(parent_id: nil) }, class_name: :Page, dependent: :destroy

  validates :name, :sitemap, presence: true
  validates :name, uniqueness: { scope: :sitemap_id }

  def get_page_tree
    root_page ? root_page.get_tree(pages.with_deleted.includes(:page_type, :comments)) : {}
  end

  def to_react_data
    { id: id, name: name, default: default, pageTree: get_page_tree }
  end
end
