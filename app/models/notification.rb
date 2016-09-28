class Notification < ActiveRecord::Base

  belongs_to :user
  belongs_to :recipient, class_name: 'User'

  scope :not_mailed, -> { where(email_sent: false) }

  def self.delete_sitemap_notification(sitemap, user)
    path = Rails.application.routes.url_helpers.home_dashboard_path
    partial_message = "deleted the #{sitemap.name} sitemap."
    add_notifications(user, sitemap, path, partial_message)
  end

  def self.sitemap_status_update_notification(sitemap, user)
    path = Rails.application.routes.url_helpers.progress_users_path
    partial_message = "updated status of the #{sitemap.name} sitemap to #{sitemap.state}."
    add_notifications(user, sitemap, path, partial_message)
  end

  def self.add_comment_notification(comment, state)
    user = comment.commenter
    sitemap = comment.sitemap
    path = Rails.application.routes.url_helpers.sitemap_path(sitemap)
    partial_message =  "#{state} a comment on " +
            (comment.commentable_type == 'Sitemap' ? '' : "#{comment.commentable.name} page(id: #{comment.commentable.uid}) of ") +
            "the #{sitemap.name} sitemap."
    add_notifications(user, sitemap, path, partial_message)
  end

  def self.resolved_comment_notification(page, user)
    sitemap = page.sitemap
    path = Rails.application.routes.url_helpers.sitemap_path(sitemap)
    partial_message =  "resolved #{page.comments.count} #{'comment'.pluralize(page.comments.count)} on " +
            "#{page.name} page of " +
            "the #{sitemap.name} sitemap."
    add_notifications(user, sitemap, path, partial_message)
  end

  def self.user_mention_notification(comment, mentioned_user)
    user = comment.commenter
    sitemap = comment.sitemap
    message = "#{user.full_name} has mentioned you in a comment on " +
            (comment.commentable_type == 'Sitemap' ? '' : "#{comment.commentable.name} page(id: #{comment.commentable.uid}) of ") +
            "the #{sitemap.name} sitemap."
    path = Rails.application.routes.url_helpers.sitemap_path(sitemap)
    Notification.create(message: message, link_to: path, user: user, recipient: mentioned_user)
  end

  private

    def self.add_notifications(user, sitemap, path, partial_message)
      sitemap.users.each do |sitemap_user|
        message = (sitemap_user == user ? 'You have ' : "#{user.full_name} has ") + partial_message
        Notification.create(message: message, link_to: path, user: user, recipient: sitemap_user)
      end
    end
end
