class Page < ActiveRecord::Base
  extend ActsAsTree::TreeView
  belongs_to :sitemap
  belongs_to :page_type
  acts_as_tree order: "name"

  validates :name, :page_type, :sitemap, presence: true

  def get_tree(collection, level = 0)
    # optimise: firing too many queries
    tree = {
      name: name,
      id: id,
      parentId: parent_id,
      level: level,
      pageType: page_type
    }
    child_pages = collection.select {|page| page.parent_id == self.id}
    tree.merge!({ children: child_pages.map { |child_page| child_page.get_tree(collection, level + 1) } })
    tree
  end
end
