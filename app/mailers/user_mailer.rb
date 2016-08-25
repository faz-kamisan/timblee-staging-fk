class UserMailer < ActionMailer::Base
  default from: 'admin@timblee.com'

  def send_updated_role_details(user_id)
    @user = User.find_by_id(user_id)
    @role = @user.is_admin ? 'Admin' : 'Standard'
    mail(
      to: @user.email,
      subject: "Role Updated"
    )
  end
end