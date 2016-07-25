class ChangeUsers < ActiveRecord::Migration
  def change
    change_table :users do |t|
      t.string :full_name
      t.string :avatar
      t.boolean :is_admin, default: false
      t.integer :business_id
    end

  end
end
