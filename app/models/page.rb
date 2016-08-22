class Page < ActiveRecord::Base
  extend ActsAsTree::TreeView
  belongs_to :sitemap
  belongs_to :page_type
  acts_as_tree order: "name"

  validates :name, presence: true

  def get_tree(level = 0)
    # optimise: firing too many queries
    tree = {
      name: name,
      id: id,
      level: level
    }
    tree.merge!({ children: self.children.map { |child| child.get_tree(level + 1) } })
    tree
  end
end
