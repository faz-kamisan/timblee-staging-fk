class Comment < ActiveRecord::Base
  belongs_to :commentable, polymorphic: true
  belongs_to :commenter, polymorphic: true
  validates :message, :commentable, :commenter, presence: true

  strip_fields :message

  scope :order_by_created_at, -> { order('created_at ASC') }
  after_create :create_comment_notification
  after_update :update_comment_notification, if: Proc.new { |c| c.message_changed? }

  def to_react_data
    { id: id, message: message, created_at: created_at_decorated, commenter: { fullName: commenter.full_name, email: commenter.email } }
  end

  def sitemap
    commentable_type == 'Sitemap' ? commentable : commentable.sitemap
  end

  def created_at_decorated
    diff_seconds = Time.current - created_at
    case diff_seconds
      when 1
        return "#{diff_seconds.to_i} second ago"
      when 0 .. 59
        return "#{diff_seconds.to_i} #{'second'.pluralize(diff_seconds.to_i)} ago"
      when 60 .. (3600-1)
        return "#{(diff_seconds/60).to_i} #{'minute'.pluralize((diff_seconds/60).to_i)} ago"
      when 3600 .. (3600*24-1)
        return "#{(diff_seconds/3600).to_i} #{'hour'.pluralize((diff_seconds/3600).to_i)} ago"
      when (3600*24) .. (3600*24*30)
        return "#{(diff_seconds/(3600*24)).to_i} #{'day'.pluralize((diff_seconds/(3600*24)).to_i)} ago"
      else
        return created_at.strftime('%d %b %Y')
    end
  end

  private

    def create_comment_notification
      Notification.add_comment_notification(self, :added)
      notify_mentioned_user if message.match('@')
    end

    def update_comment_notification
      Notification.add_comment_notification(self, :updated)
      notify_mentioned_user if message.match('@')
    end

    def notify_mentioned_user
      sitemap.users.each do |user|
        message.match("@#{user.full_name}")
        Notification.user_mention_notification(self, user)
      end
    end
end
