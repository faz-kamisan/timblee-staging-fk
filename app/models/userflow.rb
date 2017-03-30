class Userflow < ActiveRecord::Base

  belongs_to :sitemap
  has_many :screens, dependent: :destroy

  validates :sitemap, :name, presence: true
end
