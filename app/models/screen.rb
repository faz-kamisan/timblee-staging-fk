class Screen < ActiveRecord::Base

  TYPES = ['action', 'decision', 'conclusion', 'page']

  belongs_to :userflow
  belongs_to :page
  has_one :page_type, through: :page
  has_many :child_screens, class_name: 'Screen', foreign_key: :parent_id, primary_key: :id
  has_many :comments, as: :commentable, dependent: :destroy
  has_many :page_comments, source: :comments, through: :page
  after_destroy :archive_page, if: :page_id?

  validates :userflow, :node_type, :level, :position, :path, presence: true
  validates :node_type, inclusion: { in: TYPES }

  after_update :update_page_name, if: [:message_changed?, :page_id?]

  private

    def update_page_name
      page.update(name: message)
    end

    def archive_page
      page.update(state: 'archived') if page.orphan? && page.screens.count == 0
    end
end
