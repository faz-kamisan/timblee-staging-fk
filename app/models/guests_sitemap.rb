class GuestsSitemap < ActiveRecord::Base
  belongs_to :guest
  belongs_to :sitemap

  validates :guest, :sitemap, presence: true
  validates :guest, uniqueness: { scope: :sitemap }
end
