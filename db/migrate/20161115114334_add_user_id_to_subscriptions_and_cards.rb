class AddUserIdToSubscriptionsAndCards < ActiveRecord::Migration
  def change
    add_column :subscriptions, :user_id, :integer
    add_column :cards, :user_id, :integer
  end
end
