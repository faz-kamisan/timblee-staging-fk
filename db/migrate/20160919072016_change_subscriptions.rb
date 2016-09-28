class ChangeSubscriptions < ActiveRecord::Migration
  def change
    change_table :subscriptions do |t|
      t.string :stripe_subscriptions_id
    end
  end
end
