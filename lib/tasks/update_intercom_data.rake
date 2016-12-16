namespace :intercom do
  desc "Create Sections and update root page"
  task :update_user_type => :environment do
    User.all.each do |user|
      intercom_user = IntercomClient.users.find(user_id: user.id)
      intercom_user.custom_attributes["user_type"] = user.user_type
      IntercomClient.users.save(intercom_user)
    end
  end
end
