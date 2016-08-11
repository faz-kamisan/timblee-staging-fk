class BusinessMailer < ActionMailer::Base
  default from: 'admin@timblee.com',
          to: 'superadmin@timblee.com'

  def destroy_business(business_id, user_id)
    @user = User.find_by_id(user_id)
    @business = Business.find_by_id(business_id)
    mail(
      subject: "Business Deletion Request from #{ @user.email }"
    )
  end
end
