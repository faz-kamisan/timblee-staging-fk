class InvitationService

  def initialize(emails, inviter, message)
    @email_categories = {}
    @emails = emails
    @inviter = inviter
    @message = message
  end

  def invite_users
    set_email_categories
    @email_categories[:invitable_emails].each do |email|
      invited_user = User.invite!({email: email, business: @inviter.business, skip_invitation: true}, @inviter)
      InviteMailer.delay.send_invite(invited_user.id, invited_user.raw_invitation_token, @message)
    end
    @email_categories
  end

  def set_email_categories
    valid_emails, @email_categories[:invalid_emails] = @emails.partition { |email| Devise.email_regexp.match(email) }
    @email_categories[:already_signed_up_user_emails] = User.where(email: valid_emails).pluck(:email)
    @email_categories[:invitable_emails] = @emails - @email_categories[:invalid_emails] - @email_categories[:already_signed_up_user_emails]
  end

  def self.invite_users(emails, inviter, message)
    self.new(emails, inviter, message).invite_users
  end

end
