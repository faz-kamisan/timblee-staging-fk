namespace :sitemaps do
  desc " Add user to sitemaps"
  task :add_user => :environment do
    Sitemap.all.each {|sitemap| sitemap.update(user_id: sitemap.business.owner_id)}
  end
end

namespace :subscriptions do
  desc " Add user to subscriptions"
  task :add_user => :environment do
    Subscription.all.each {|subscription| subscription.update(user_id: subscription.business.owner_id)}
  end
end


namespace :cards do
  desc " Add user to cards"
  task :add_user => :environment do
    Card.all.each {|card| card.update(user_id: card.business.owner_id)}
  end
end
