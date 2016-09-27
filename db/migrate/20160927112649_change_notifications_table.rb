class ChangeNotificationsTable < ActiveRecord::Migration
  def change
    add_column :notifications, :recipient_id, :integer
  end
end
