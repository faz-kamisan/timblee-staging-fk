class RenameColumnTypeToNodeTypeInScreens < ActiveRecord::Migration
  def change
    rename_column :screens, :type, :node_type
  end
end
