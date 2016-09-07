class AddIconNameToPageType < ActiveRecord::Migration
  def change
    add_column :page_types, :icon_name, :string 
  end
end
