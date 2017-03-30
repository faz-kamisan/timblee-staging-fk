class CreateUserflows < ActiveRecord::Migration
  def change
    create_table :userflows do |t|
      t.string :name
      t.integer :sitemap_id

      t.timestamps null: false
    end
  end
end
