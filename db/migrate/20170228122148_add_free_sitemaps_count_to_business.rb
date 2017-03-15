class AddFreeSitemapsCountToBusiness < ActiveRecord::Migration
  def change
    add_column :businesses, :free_sitemaps_count, :integer, default: 1
  end
end
