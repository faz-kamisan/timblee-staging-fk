class AddStateToSiteMaps < ActiveRecord::Migration
  def change
    add_column :site_maps, :state, :string
  end
end
