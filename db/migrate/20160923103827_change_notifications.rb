class ChangeNotifications < ActiveRecord::Migration
  def change
    change_table :notifications do |t|
      t.boolean :email_sent, default: false
    end
  end
end
