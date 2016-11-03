class AddActorIdToNotifications < ActiveRecord::Migration

  def change
    add_column :notifications, :actor_id, :integer
    add_column :notifications, :actor_type, :integer

    remove_column :notifications, :user_id, :integer

    Notification.destroy_all
  end

end
