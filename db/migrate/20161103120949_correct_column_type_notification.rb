class CorrectColumnTypeNotification < ActiveRecord::Migration
  def change
    remove_column :notifications, :actor_type, :integer

    add_column :notifications, :actor_type, :string

    Notification.destroy_all
  end
end
