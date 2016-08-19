class Page < ActiveRecord::Base
  belongs_to :sitemap
  belongs_to :page_type
  acts_as_tree order: "name"

  validates :name, presence: true

  def get_tree
    # optimise: firing too many queries
    tree = {
      name: name
    }
    tree.merge!({ children: self.children.map { |child| child.get_tree } })
    tree
  end
end
