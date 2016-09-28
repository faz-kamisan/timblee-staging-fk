class CreateNotifications < ActiveRecord::Migration
  def change
    create_table :notifications do |t|
      t.string :message
      t.string :link_to
      t.references :user
      t.timestamps null: false
    end
  end
end
