class AddUserIdToSitemap < ActiveRecord::Migration
  def change
    add_column :sitemaps, :user_id, :integer
  end
end
