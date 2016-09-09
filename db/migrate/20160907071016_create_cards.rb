class CreateCards < ActiveRecord::Migration
  def change
    create_table :cards do |t|
      t.integer :last4
      t.string :brand
      t.references :business

      t.timestamps null: false
    end
  end
end
