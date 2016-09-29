class SitemapSharedUser < ActiveRecord::Base
  belongs_to :sitemap
  validates :sitemap, :user_email, presence: true
end
