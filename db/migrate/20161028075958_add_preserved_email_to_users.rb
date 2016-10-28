class AddPreservedEmailToUsers < ActiveRecord::Migration
  def change
    add_column :users, :preserved_email, :string

    change_column :users, :email, :string, null: true, default: nil
  end
end
