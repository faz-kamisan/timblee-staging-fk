namespace :guestsSitemaps do
  desc "Create guestsSitemaps records from old data"
  task :create => :environment do
    Comment.where(commenter_type: 'Guest').each { |c|  c.commenter.sitemaps << c.sitemap if c.commenter.sitemaps.find_by(id: c.sitemap.id).blank? }
  end
end
