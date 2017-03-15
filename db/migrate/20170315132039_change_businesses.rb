class ChangeBusinesses < ActiveRecord::Migration
  def change
    change_column :businesses, :trial_days, :float
  end
end
