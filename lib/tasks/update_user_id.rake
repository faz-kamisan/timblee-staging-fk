namespace :sitemaps do
  desc " Add user to sitemaps"
  task :add_user => :environment do
    Sitemap.all.each {|sitemap| sitemap.update(user_id: sitemap.business.owner_id)}
  end
end
