class AddNodeIdToScreens < ActiveRecord::Migration
  def change
    add_column :screens, :node_id, :string
  end
end
