class Notification < ActiveRecord::Base

  TYPES = %i( delete_sitemap
              update_sitemap_status
              add_comment
              update_comment
              resolve_comments
              mention_user )

  belongs_to :user
  belongs_to :sitemap

  belongs_to :recipient, polymorphic: true

  validates :kind, :user, :sitemap, :recipient, presence: true

  before_create :set_path, :set_message

  after_create :send_via_email, if: :for_guest?

  scope :sent, -> { where(email_sent: true) }
  scope :not_sent, -> { where(email_sent: false) }

  attr_accessor :kind, :resource

  def for_guest?
    recipient.is_a? Guest
  end

  def sitemap_name
    sitemap.name
  end

  def actor_name
    user.first_name
  end

  def message_keys
    keys = []
    keys.unshift(kind)
    keys.unshift("#{kind}_on_#{resource.class.name.underscore}".to_sym) if resource
    keys
  end

  def path_value(key)
    case key
    when :delete_sitemap        then Rails.application.routes.url_helpers.root_path
    when :update_sitemap_status then Rails.application.routes.url_helpers.progress_users_path
    else  Rails.application.routes.url_helpers.sitemap_path(sitemap)
    end
  end

  def message_value(key)
    case key
    when :delete_sitemap
      "#{sitemap_name} was deleted by #{actor_name}."
    when :update_sitemap_status
      "#{actor_name} updated the status of the #{sitemap_name} to #{sitemap.state.titleize}."
    when :add_comment
      "#{actor_name} commented on #{sitemap_name}."
    when :add_comment_on_page
      "#{sitemap_name} - #{actor_name} added a comment on #{resource.name}."
    when :update_comment
      "#{actor_name} updated comment on #{sitemap_name}."
    when :update_comment_on_page
      "#{sitemap_name} - #{actor_name} updated a comment on #{resource.name}."
    when :resolve_comments
      "#{sitemap.name}  - #{actor_name} resolved a comment on #{resource.name}."
    when :mention_user
      "#{sitemap.name} - #{actor_name} mentioned you in a comment on General Comments."
    when :mention_user_on_page
      "#{sitemap.name} - #{actor_name} mentioned you in a comment on #{resource.name}."
    end
  end


  def self.generate(kind: nil, actor: nil, sitemap: nil, resource: nil, recipients: [])
    recipients = Array(recipients.presence || (sitemap.users - [actor]))

    recipients.each do |recipient|
      notification = self.new(user: actor, sitemap: sitemap, recipient: recipient)
      notification.kind = kind
      notification.resource = resource
      notification.save
    end
  end

  private

  def set_path
    self.path = path_value(kind)
  end

  def set_message
    message = nil
    message_keys.detect { |k| message = message_value(k) }
    self.message = message
  end

  def send_via_email
    GuestMailer.delay.send_notification(id)
  end

end
