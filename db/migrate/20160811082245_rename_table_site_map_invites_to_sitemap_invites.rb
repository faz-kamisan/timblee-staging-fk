class RenameTableSiteMapInvitesToSitemapInvites < ActiveRecord::Migration
  def change
    rename_table :site_map_invites, :sitemap_invites
  end
end
