class RenameColumnSiteMapIdToSitemapId < ActiveRecord::Migration
  def change
    rename_column :pages, :site_map_id, :sitemap_id
    rename_column :sitemap_invites, :site_map_id, :sitemap_id
  end
end
