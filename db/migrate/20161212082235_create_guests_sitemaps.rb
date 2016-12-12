class CreateGuestsSitemaps < ActiveRecord::Migration
  def change
    create_table :guests_sitemaps do |t|
      t.integer :guest_id
      t.integer :sitemap_id
    end
  end
end
