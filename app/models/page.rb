class Page < ActiveRecord::Base
  STATES = ['active', 'archived', 'resolved']

  belongs_to :sitemap
  belongs_to :section, touch: true
  belongs_to :page_type
  has_many :child_pages, class_name: 'Page', foreign_key: :parent_id, primary_key: :id
  has_many :comments, as: :commentable, dependent: :destroy
  acts_as_tree order: :position
  acts_as_list scope: :parent

  before_validation :set_uid, on: :create, unless: :uid
  before_update :update_children_section_id, if: :alt_section_id_changed?
  before_update :archive_children_pages, if: :state_changed?

  validates :name, :page_type, :sitemap, :uid, presence: true
  validates :section, presence: true, unless: :footer?
  validates :state, inclusion: { in: STATES }
  validates :uid, uniqueness: { scope: :sitemap_id }

  def duplicate(duplicate_section, duplicate_parent_id)
    duplicate = dup
    duplicate.section = duplicate_section
    duplicate.parent_id = duplicate_parent_id
    duplicate.sitemap = duplicate_section.sitemap
    duplicate.save
    child_pages.order(:position).each { |page| page.duplicate(duplicate_section, duplicate.id)}
  end

  def get_tree(collection, level = 0)
    tree = to_react_data.merge(level: level)
    child_pages = collection.select {|page| page.parent_id == self.id}.sort_by(&:position)
    tree.merge!({ children: child_pages.map { |child_page| child_page.get_tree(collection, level + 1) } })
    tree
  end

  def to_react_data
    {
      name: name.to_s,
      id: id,
      uid: uid,
      section_id: section_id,
      alt_section_id: alt_section_id,
      parentId: parent_id,
      position: position,
      comments: comments.sort_by(&:created_at).map(&:to_react_data),
      pageType: page_type,
      collapsed: false,
      sitemapId: sitemap_id,
      state: state,
      footer: footer,
      newRecord: false
    }
  end

  private

    def update_children_section_id
      children.each do |child|
        child.update(section_id: self.alt_section_id)
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
