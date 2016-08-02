class Page < ActiveRecord::Base
  belongs_to :site_map
  belongs_to :page_type
  belongs_to :parent, class_name: :Page
  has_many :children, class_name: :Page, foreign_key: :parent_id, dependent: :destroy

  validates :name, presence: true
end
