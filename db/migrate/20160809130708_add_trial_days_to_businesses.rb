class AddTrialDaysToBusinesses < ActiveRecord::Migration
  def change
    add_column :businesses, :trial_days, :integer
  end
end
