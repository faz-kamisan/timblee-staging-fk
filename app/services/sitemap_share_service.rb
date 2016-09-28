class SitemapShareService

  def initialize(emails, inviter, sitemap, message)
    @emails = emails
    @inviter = inviter
    @sitemap = sitemap
    @message = message
  end

  def share_sitemap
    @emails.each do |email|
      SitemapMailer.delay.send_share_link(email, @inviter.full_name, @sitemap.id, @message)
    end
  end

  def self.share_sitemap(emails, inviter, sitemap, message)
    self.new(emails, inviter, sitemap, message).share_sitemap
  end
end
