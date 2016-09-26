class Notification < ActiveRecord::Base

  belongs_to :user

  scope :not_mailed, -> { where(email_sent: false) }

  def self.delete_sitemap_notification(sitemap, user)
    path = Rails.application.routes.url_helpers.home_dashboard_path
    partial_message = " deleted #{sitemap.name} sitemap"
    add_notifications(user, sitemap, path, partial_message)
  end

  def self.sitemap_status_update_notification(sitemap, user)
    path = Rails.application.routes.url_helpers.progress_users_path
    partial_message = " updated status of #{sitemap.name} sitemap to #{sitemap.state}"
    add_notifications(user, sitemap, path, partial_message)
  end

  def self.add_comment_notification(comment, state)
    user = comment.commenter
    sitemap = comment.commentable_type == 'Sitemap' ? comment.commentable : comment.commentable.sitemap
    path = Rails.application.routes.url_helpers.sitemap_path(sitemap)
    partial_message = (state == :create ? " added " : " resolved ") + "a comment on " +
                      (comment.commentable_type == 'Sitemap' ? '' : "#{comment.commentable.name} page of ") + "#{sitemap.name} sitemap"
    add_notifications(user, sitemap, path, partial_message)
  end

  def self.user_mention_notification(comment, mentioned_user)
    user = comment.commenter
    sitemap = comment.commentable
    message = "#{user.full_name} has mentioned you in a comment on sitemap #{sitemap.name}"
    path = Rails.application.routes.url_helpers.sitemap_path(sitemap)
    Notification.create(message: message, link_to: path, user_id: mentioned_user.id)
  end

  private

    def self.add_notifications(user, sitemap, path, partial_message)
      sitemap.users.each do |sitemap_user|
        message = (sitemap_user == user ? 'You have' : "#{user.full_name} has") + partial_message
        Notification.create(message: message, link_to: path, user_id: sitemap_user.id)
      end
    end
end
