class Page < ActiveRecord::Base
  extend ActsAsTree::TreeView
  belongs_to :sitemap
  belongs_to :page_type
  has_many :comments, as: :commentable
  acts_as_tree order: :position
  acts_as_list scope: :parent

  validates :name, :page_type, :sitemap, presence: true

  def get_tree(collection, level = 0)
    tree = {
      name: name,
      id: id,
      parentId: parent_id,
      position: position,
      level: level,
      comments: comments.map(&:to_react_data),
      pageType: page_type
    }
    child_pages = collection.select {|page| page.parent_id == self.id}.sort_by(&:position)
    tree.merge!({ children: child_pages.map { |child_page| child_page.get_tree(collection, level + 1) } })
    tree
  end
end
