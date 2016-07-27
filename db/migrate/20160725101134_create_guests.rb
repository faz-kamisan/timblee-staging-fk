class CreateGuests < ActiveRecord::Migration
  def change
    create_table :guests do |t|
      t.string :full_name
      t.string :email

      t.timestamps null: false
    end
  end
end
