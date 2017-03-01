namespace :intercom do
  task update_deleted_user_data: :environment do
    User.unscoped.where(email: nil).each do |user|
      p user
      begin
        Analytics.new(user).track_soft_delete if user.business
        intercom_user = IntercomClient.users.find(user_id: user.id)
        intercom_user.unsubscribed_from_emails = true
        IntercomClient.users.save(intercom_user)
      rescue => e
        p e.inspect
      end
    end
  end
  task update_starter_plan_name: :environment do
    Business.where(has_plan: true, is_pro: false).each do |business|
      begin
        intercom_business = IntercomClient.companies.find(company_id: business.id)
        intercom_business.plan = business.plan_name
        IntercomClient.companies.save(intercom_business)
      rescue => e
        p e.inspect
      end
    end
  end

end
