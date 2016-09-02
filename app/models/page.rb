class Page < ActiveRecord::Base
  extend ActsAsTree::TreeView
  belongs_to :sitemap
  belongs_to :page_type
  has_many :comments, as: :commentable
  acts_as_tree order: :position
  acts_as_list scope: :parent

  before_validation :set_uid, on: :create

  validates :name, :page_type, :sitemap, :uid, presence: true

  def get_tree(collection, level = 0)
    tree = {
      name: name,
      id: id,
      uid: uid,
      parentId: parent_id,
      position: position,
      level: level,
      comments: comments.map(&:to_react_data),
      pageType: page_type,
      collapsed: false
    }
    child_pages = collection.select {|page| page.parent_id == self.id}.sort_by(&:position)
    tree.merge!({ children: child_pages.map { |child_page| child_page.get_tree(collection, level + 1) } })
    tree
  end

  private
    def set_uid
      highest_uid = sitemap.pages.maximum('uid')
      self.uid = highest_uid + 1
    end
end
