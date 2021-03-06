class GuestMailer < ActionMailer::Base
  default from: 'hello@timblee.io'

  def send_notification(notification_id)
    @notification = Notification.find(notification_id)
    @guest = @notification.recipient

    if Rails.env.production?
      smart_email_id = CampaignMonitor::SMART_EMAIL_IDS[:guest_notification_email]
      tx_smart_mailer = CreateSend::Transactional::SmartEmail.new(CampaignMonitor::AUTH, smart_email_id)
      message = {
      'To' => "#{@guest.full_name} <#{@guest.email}>",
        'Data' => {
          'guest-first-name' => @guest.first_name,
          'business-name' => @notification.sitemap.business.name,
          'notification-text' => @notification.message,
          'notification-link' => @notification.path
        }
      }
      response = tx_smart_mailer.send(message)
    else
      mail(
        to: @notification.recipient.email,
        subject: "Notifications for #{@notification.sitemap.name}"
      )
    end
  end

end
