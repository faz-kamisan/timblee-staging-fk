class Notification < ActiveRecord::Base

  def self.delete_sitemap_notification(sitemap, user, path)
    sitemap.users.each do |sitemap_user|
      message = (sitemap_user == user ? 'You have' : "#{user.full_name} has") + " deleted #{sitemap.name} sitemap"
      Notification.create(message: message, link_to: path, user_id: sitemap_user.id)
    end
  end

  def self.sitemap_status_update_notification(sitemap, user, path)
    sitemap.users.each do |sitemap_user|
      message = (sitemap_user == user ? 'You have' : "#{user.full_name} has") + " updated status of #{sitemap.name} sitemap to #{sitemap.state}"
      Notification.create(message: message, link_to: path, user_id: sitemap_user.id)
    end
  end
end
