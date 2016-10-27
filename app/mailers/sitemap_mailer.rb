class SitemapMailer < ActionMailer::Base
  default from: 'admin@timblee.com'
  def send_share_link(email, inviter_name, sitemap_id, custom_message)
    @inviter_name = inviter_name
    @inviter_first_name = @inviter_name.split(' ').first
    @email = email
    custom_message ||= ''
    @custom_message = custom_message.gsub(/\r\n/, '<br>').html_safe
    @sitemap = Sitemap.find_by(id: sitemap_id)
    @custom_message_header = "Here is a personal message from #{@inviter_first_name}" if custom_message.present?

    if Rails.env.staging?
      smart_email_id = CampaignMonitor::SMART_EMAIL_IDS[:share_sitemap]
      tx_smart_mailer = CreateSend::Transactional::SmartEmail.new(CampaignMonitor::AUTH, smart_email_id)
      message = {
      'To' => email,
        'Data' => {
          'firstname' => @inviter_first_name,
          'sitemap-name' => @sitemap.name,
          'inviting_user_name' => @inviter_name,
          'sitemap_name' => @sitemap.name,
          'inviting_user_firstname' => @inviter_first_name,
          'Here is a personal message from inviter:' => @custom_message_header,
          'Insert personal message here' => @custom_message,
          'public share link' => sitemap_public_share_url(@sitemap.public_share_token).gsub(/(?<protocol>http(s?):\/\/)/, '\k<protocol>share.')
        }
      }
      response = tx_smart_mailer.send(message)
    else
      mail(
        to: email,
        subject: "Timblee Invitation from #{ inviter_name }"
      )
    end

  end
end
