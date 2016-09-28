class CreateSections < ActiveRecord::Migration
  def change
    create_table :sections do |t|
      t.string :name
      t.boolean :default
      t.references :sitemap
      t.timestamps
    end
  end
end
