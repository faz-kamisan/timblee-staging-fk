class CreateSiteMap < ActiveRecord::Migration
  def change
    create_table :site_maps do |t|
      t.string :name
      t.references :folder
      t.references :business
      t.timestamps null: false
    end
  end
end
