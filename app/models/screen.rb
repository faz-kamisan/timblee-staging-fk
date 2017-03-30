class Screen < ActiveRecord::Base

  TYPES = [:action, :decision, :conclusion, :page]

  belongs_to :userflow
  belongs_to :page
  has_many :child_screens, class_name: 'Screen', foreign_key: :parent_id, primary_key: :id
  has_many :comments, as: :commentable, dependent: :destroy
  has_many :page_comments, source: :comments, through: :page

  validates :userflow, :message, :type, :level, :position, :path, presence: true
  validates :type, inclusion: { in: TYPES }

end
