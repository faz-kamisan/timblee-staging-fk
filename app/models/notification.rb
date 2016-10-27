class Notification < ActiveRecord::Base

  belongs_to :user
  belongs_to :recipient, class_name: 'User'

  scope :not_mailed, -> { where(email_sent: false) }

  def self.delete_sitemap_notification(sitemap, user)
    path = '#'
    message = "#{sitemap.name} was deleted by #{user.first_name}."
    add_notifications(user, sitemap, path, message)
  end

  def self.sitemap_status_update_notification(sitemap, user)
    path = Rails.application.routes.url_helpers.progress_users_path
    message = "#{user.first_name} updated the status of the #{sitemap.name} to #{sitemap.state.titleize}."
    add_notifications(user, sitemap, path, message)
  end

  def self.add_comment_notification(comment, state)
    user = comment.commenter
    sitemap = comment.sitemap
    path = Rails.application.routes.url_helpers.sitemap_path(sitemap)
    message = comment.commentable_type == 'Sitemap' ? "#{user.first_name} commented on #{sitemap.name}" : "#{sitemap.name} - #{user.first_name} #{state} a comment on #{comment.commentable.name}"
    add_notifications(user, sitemap, path, message)
  end

  def self.resolved_comment_notification(page, user)
    sitemap = page.sitemap
    path = Rails.application.routes.url_helpers.sitemap_path(sitemap)
    message =  "#{sitemap.name}  - #{user.first_name} resolved a comment on #{page.name} "
    add_notifications(user, sitemap, path, message)
  end

  def self.user_mention_notification(comment, mentioned_user)
    user = comment.commenter
    sitemap = comment.sitemap
    message = "#{sitemap.name} - #{user.first_name} mentioned you in a comment on " +
              (comment.commentable_type == 'Sitemap' ? 'General Comments' : "#{comment.commentable.name}")
    path = Rails.application.routes.url_helpers.sitemap_path(sitemap)
    Notification.create(message: message, link_to: path, user: user, recipient: mentioned_user) unless mentioned_user == user
  end

  private

    def self.add_notifications(user, sitemap, path, message)
      sitemap.users.each do |sitemap_user|
        Notification.create(message: message, link_to: path, user: (user.class == User ? user : nil), recipient: sitemap_user) unless sitemap_user == user
      end
    end
end
