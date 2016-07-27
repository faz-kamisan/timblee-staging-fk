class CreateBusinesses < ActiveRecord::Migration
  def change
    create_table :businesses do |t|
      t.string :name
      t.string :logo
      t.string :stripe_customer_id
      t.integer :owner_id

      t.timestamps null: false

    end
  end
end
