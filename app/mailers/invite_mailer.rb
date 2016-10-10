class InviteMailer < ActionMailer::Base
  default from: 'pratibha@vinsol.com'

  def send_invite(user_id, token, custom_message = '')
    @user = User.find_by_id(user_id)
    @token = token
    @custom_message = custom_message.gsub(/\r\n/, '<br>').html_safe
    @inviter = User.find_by_id(@user.invited_by_id)
    mail(
      to: @user.email,
      subject: "Timblee Invitation from #{ @inviter.full_name }"
    )
  end
end
