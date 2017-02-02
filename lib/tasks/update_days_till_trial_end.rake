namespace :intercom do
  task update_days_till_trial_end: :environment do
    IntercomClient.users.all.each do |intercom_user|
      user = User.find_by(id: intercom_user.user_id)
      if user
        intercom_user.custom_attributes["days_till_trial_end"] = user.business.days_till_trial_end
        IntercomClient.users.save(intercom_user)
      end
    end
  end
end
