class AddPublicShareTokenToSitemaps < ActiveRecord::Migration
  def change
    add_column :sitemaps, :public_share_token, :string
  end
end
