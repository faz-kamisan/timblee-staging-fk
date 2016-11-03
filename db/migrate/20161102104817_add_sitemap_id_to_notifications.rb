class AddSitemapIdToNotifications < ActiveRecord::Migration
  def change
    add_column :notifications, :recipient_type, :string
    add_column :notifications, :sitemap_id, :integer

    rename_column :notifications, :link_to, :path

    add_index :notifications, :sitemap_id
  end
end
