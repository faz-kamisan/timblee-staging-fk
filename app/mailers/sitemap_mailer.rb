class SitemapMailer < ActionMailer::Base
  default from: 'admin@timblee.com'
  def send_share_link(email, inviter_name, sitemap_id, custom_message)
    @inviter_name = inviter_name
    @email = email
    custom_message ||= ''
    @custom_message = custom_message.gsub(/\r\n/, '<br>').html_safe
    @sitemap = Sitemap.find_by(id: sitemap_id)
    mail(
      to: email,
      subject: "Timblee Invitation from #{ inviter_name }"
    )
  end
end
