class CreatePage < ActiveRecord::Migration
  def change
    create_table :pages do |t|
      t.string :name
      t.references :site_map
      t.references :page_type
      t.references :parent
      t.timestamps null: false
    end
  end
end
