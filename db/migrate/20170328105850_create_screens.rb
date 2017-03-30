class CreateScreens < ActiveRecord::Migration
  def change
    create_table :screens do |t|
      t.string :type
      t.string :message
      t.integer :level
      t.float :position
      t.integer :parent_id
      t.string :path
      t.integer :userflow_id
      t.integer :page_id
      t.integer :linking_screen_id

      t.timestamps null: false
    end
  end
end
