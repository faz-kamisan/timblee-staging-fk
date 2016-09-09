class ChangeBusinessesTable < ActiveRecord::Migration
  def change
    change_table :businesses do |t|
      t.boolean :has_plan, default: false
      t.boolean :is_pro, default: false
    end
  end
end
