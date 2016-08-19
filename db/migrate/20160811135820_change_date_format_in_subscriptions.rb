class ChangeDateFormatInSubscriptions < ActiveRecord::Migration
  def change
    change_table :subscriptions do |t|
      t.remove :start_date
      t.remove :end_date
      t.datetime :start_at
      t.datetime :end_at
    end
  end
end
