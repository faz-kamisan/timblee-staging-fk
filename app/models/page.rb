class Page < ActiveRecord::Base
  extend ActsAsTree::TreeView
  belongs_to :sitemap
  belongs_to :section
  belongs_to :page_type
  has_many :comments, as: :commentable, dependent: :destroy
  acts_as_tree order: :position
  acts_as_list scope: :parent

  before_validation :set_uid, on: :create
  before_update :update_children_section_id, if: :section_id_changed?
  before_update :archive_children_pages, if: :state_changed?

  validates :name, :section, :page_type, :sitemap, :uid, presence: true
  validates :state, inclusion: { in: ['active', 'archived', 'resolved'] }
  validates :uid, uniqueness: { scope: :sitemap_id }

  def get_tree(collection, level = 0)
    tree = {
      name: name.to_s,
      id: id,
      uid: uid,
      section_id: section_id,
      parentId: parent_id,
      position: position,
      level: level,
      comments: comments.sort_by(&:created_at).map(&:to_react_data),
      pageType: page_type,
      collapsed: false,
      sitemapId: sitemap_id,
      state: state
    }
    child_pages = collection.select {|page| page.parent_id == self.id}.sort_by(&:position)
    tree.merge!({ children: child_pages.map { |child_page| child_page.get_tree(collection, level + 1) } })
    tree
  end


  private
    def update_children_section_id
      children.each do |child|
        child.update(section_id: self.section_id)
      end
    end

    def archive_children_pages
      if(state == 'archived')
        children.each do |child|
          child.update(state: 'archived')
        end
      end
    end

    def set_uid
      highest_uid = sitemap.pages.maximum('uid')
      self.uid = highest_uid.to_i + 1
    end
end
