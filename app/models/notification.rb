class Notification < ActiveRecord::Base

  def self.delete_sitemap_notification(sitemap, user, path)
    partial_message = " deleted #{sitemap.name} sitemap"
    add_notifications(user, sitemap, path, partial_message)
  end

  def self.sitemap_status_update_notification(sitemap, user, path)
    partial_message = " updated status of #{sitemap.name} sitemap to #{sitemap.state}"
    add_notifications(user, sitemap, path, partial_message)
  end

  def self.add_comment_notification(comment, state)
    user = comment.commenter
    sitemap = comment.commentable
    path = Rails.application.routes.url_helpers.sitemap_path(sitemap)
    partial_message = state == :create ? " added a comment on sitemap #{sitemap.name}" : " resolved a comment on sitemap #{sitemap.name}"
    add_notifications(user, sitemap, path, partial_message)
  end

  private

    def add_notifications(user, sitemap, path, partial_message)
      sitemap.users.each do |sitemap_user|
        message = (sitemap_user == user ? 'You have' : "#{user.full_name} has") + partial_message
        Notification.create(message: message, link_to: Rails.application.routes.url_helpers.sitemap_path(sitemap), user_id: sitemap_user.id)
      end
    end
end
