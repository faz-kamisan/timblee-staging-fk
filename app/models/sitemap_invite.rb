class SitemapInvite < ActiveRecord::Base
  belongs_to :sitemap
  belongs_to :user
end
