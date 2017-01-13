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
end
