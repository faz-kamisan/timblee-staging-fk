class UserMailer < ActionMailer::Base
  default from: 'admin@timblee.com'

  def send_updated_role_details(user_id, admin_user_id)
    @user = User.find_by_id(user_id)
    @admin_user = User.find_by_id(admin_user_id)
    @role = @user.is_admin ? 'Admin' : 'Standard'
    if Rails.env.production?
      if(@user.is_admin)
        smart_email_id = CampaignMonitor::SMART_EMAIL_IDS[:admin_changes_user_role_to_admin]
        tx_smart_mailer = CreateSend::Transactional::SmartEmail.new(CampaignMonitor::AUTH, smart_email_id)
        message = {
        'To' => "#{@user.full_name} <#{@user.email}>",
          'Data' => {
            'user-first-name' => @user.full_name,
            'business-name' => @user.business.name,
            'admin_user_name' => @admin_user.full_name,
            'business_name' => @user.business.name,
            'show the whole verification link here' => settings_users_url
          }
        }
        response = tx_smart_mailer.send(message)
      end
    else
      mail(
        to: @user.email,
        subject: "Role Updated"
      )
    end

  end

  def send_pending_notification(user_id, notification_ids)
    @user = User.find_by_id(user_id)
    @notifications = Notification.where(id: notification_ids)
    mail(
      to: @user.email,
      subject: "Notifications"
    )
  end

end
