class RenameTableSiteMapsToSitemaps < ActiveRecord::Migration
  def change
    rename_table :site_maps, :sitemaps
  end
end
