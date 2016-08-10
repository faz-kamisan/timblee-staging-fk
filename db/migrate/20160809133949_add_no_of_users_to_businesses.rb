class AddNoOfUsersToBusinesses < ActiveRecord::Migration
  def change
    add_column :businesses, :no_of_users, :integer
  end
end
