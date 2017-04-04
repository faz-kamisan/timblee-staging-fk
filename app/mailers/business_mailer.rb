class BusinessMailer < ActionMailer::Base
  default from: 'hello@timblee.io',
          to: 'superadmin@timblee.io'

  def send_admin_account_destroy_request(business_id, user_id)
    @user = User.find_by_id(user_id)
    @business = Business.find_by_id(business_id)

    if Rails.env.production?
      smart_email_id = CampaignMonitor::SMART_EMAIL_IDS[:account_deletion_request]
      tx_smart_mailer = CreateSend::Transactional::SmartEmail.new(CampaignMonitor::AUTH, smart_email_id)
      message = {
      'To' => ["Timblee <roohbir@timblee.io>", 'Timblee <faz@timblee.io>'],
        'Data' => {
          'business-name' => @business.name,
          'account-ID' => @business.id,
          'admin_user_name' => @business.owner.full_name,
          'business_name' => @business.name,
          'plan_name' => @business.plan_name,
          'total_users' => @business.users.count,
          'date' => Date.current.strftime('%d %b %Y'),
          'account_creation_date' => @business.created_at.strftime('%d %b %Y'),
          'total_spend' => ''
        }
      }
      response = tx_smart_mailer.send(message)
    else
      mail(
        subject: "Business Deletion Request from #{ @user.email }"
      )
    end

  end
end
