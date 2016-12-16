namespace :intercom do
  desc "Create Sections and update root page"
  task :update_user_type => :environment do
    IntercomClient.users.all.each do |intercom_user|
      user = User.find_by(id: intercom_user.user_id)
      if user
        intercom_user.custom_attributes["user_type"] = user.user_type
        IntercomClient.users.save(intercom_user)
      else
        p intercom_user.user_id
      end
    end
  end
end
