class Section < ActiveRecord::Base
  belongs_to :sitemap
  has_many :pages
  has_one :root_page, ->{ where(parent_id: nil) }, class_name: :Page

  validates :name, :sitemap, presence: true
  validates :name, uniqueness: { scope: :sitemap_id }

  before_destroy :destroy_root_page

  attr_accessor :really_destroy_root_page

  def get_page_tree
    root_page ? root_page.get_tree(pages.with_deleted.includes(:page_type, :comments)) : {}
  end

  def to_react_data
    { id: id, name: name, default: default, pageTree: get_page_tree }
  end

  def destroy_root_page
    if really_destroy_root_page
      root_page.really_destroy!
    else
      root_page.destroy
    end
  end
end
