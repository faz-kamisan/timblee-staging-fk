class ChangeSubscriptionsTable < ActiveRecord::Migration
  def change
    change_table :subscriptions do |t|
      t.remove_references :plan, index: true, foreign_key: true
    end
  end
end
