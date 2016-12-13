class Comment < ActiveRecord::Base
  belongs_to :commentable, polymorphic: true, touch: true
  belongs_to :commenter, polymorphic: true
  validates :message, :commentable, :commenter, presence: true

  strip_fields :message

  scope :order_by_created_at, -> { order('created_at ASC') }

  after_create :create_comment_notification
  after_create :create_guests_sitemaps, if: Proc.new {|comment| comment.commenter_type == 'Guest' }
  after_update :update_comment_notification, if: :message_changed?

  after_save :notify_mentioned_users, if: :message_changed?

  def to_react_data
    { id: id, message: CGI.unescapeHTML(message), created_at: created_at_decorated, commenter: { fullName: commenter.full_name, email: commenter.email, avatar: (commenter_type == 'User' ? commenter.avatar : nil) } }
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

  def mentioned_people
    users, guests = [], []
    reg_exp = Regexp.new("<strong data-mention=\"(.*?)\">")

    message.scan(reg_exp).flatten.each do |string|
      type, id = string.split(':')
      (type == 'user') ? (users << id) : (guests << id)
    end

    User.find(users) + Guest.find(guests)
  end

  private
    def create_guests_sitemaps
      self.commenter.sitemaps << sitemap if commenter.sitemaps.find_by(id: sitemap.id).blank?
    end

    def create_comment_notification
      Notification.generate(kind: :add_comment, sitemap: sitemap, actor: commenter, resource: commentable)
    end

    def update_comment_notification
      Notification.generate(kind: :update_comment, sitemap: sitemap, actor: commenter, resource: commentable)
    end

    def notify_mentioned_users
      Notification.generate(kind: :mention_user, sitemap: sitemap, actor: commenter, resource: commentable, recipients: mentioned_people) if mentioned_people.present?
    end
  end
