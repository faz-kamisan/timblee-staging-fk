class InviteMailer < ActionMailer::Base
  include Devise::Controllers::UrlHelpers

  default from: 'pratibha@vinsol.com'

  def send_invite(user_id, token, custom_message = '')
    @user = User.find_by_id(user_id)
    @token = token
    @custom_message = custom_message.gsub(/\r\n/, '<br>').html_safe
    @inviter = User.find_by_id(@user.invited_by_id)
    @custom_message_header = "Here is a personal message from #{@inviter.full_name}" if @custom_message.present?

    if Rails.env.staging?
      smart_email_id = CampaignMonitor::SMART_EMAIL_IDS[:invite_users_to_timble]
      tx_smart_mailer = CreateSend::Transactional::SmartEmail.new(CampaignMonitor::AUTH, smart_email_id)
      message = {
      'To' => "#{@user.full_name} <#{@user.email}>",
        'Data' => {
          'inviting_user_first_name' => @user.full_name,
          'inviting_user_name' => @user.full_name,
          'Here is a personal message from&nbsp;[inviting_user_name' => @custom_message_header,
          'Insert personal message here' => @custom_message,
          'show the whole link here' => accept_invitation_url(@user, :invitation_token => @token)
        }
      }
      response = tx_smart_mailer.send(message)
    else
      mail(
        to: @user.email,
        subject: "Timblee Invitation from #{ @inviter.full_name }"
      )
    end

  end
end
