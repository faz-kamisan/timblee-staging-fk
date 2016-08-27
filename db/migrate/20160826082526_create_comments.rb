class CreateComments < ActiveRecord::Migration
  def change
    create_table :comments do |t|
      t.string :message
      t.integer :commentable_id
      t.string :commentable_type
      t.integer :commenter_id
      t.string :commenter_type
      t.string :state
      t.timestamps null: false
    end
  end
end
