class AddPositionToSitemaps < ActiveRecord::Migration
  def change
    add_column :sitemaps, :position, :integer
  end
end
