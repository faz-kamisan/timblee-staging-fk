class CreateSiteMapInvites < ActiveRecord::Migration
  def change
    create_table :site_map_invites do |t|
      t.references :user
      t.references :site_map
      t.timestamps null: false
    end
  end
end
