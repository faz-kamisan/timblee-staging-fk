class ChangeTableSitemapInvitesToSitemapsSharedUsers < ActiveRecord::Migration
  def change
    rename_table :sitemap_invites, :sitemap_shared_users
    remove_column :sitemap_shared_users, :user_id
    add_column :sitemap_shared_users, :user_email, :string
  end
end
