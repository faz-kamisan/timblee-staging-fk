class RemoveStateFromComments < ActiveRecord::Migration
  def change
    remove_column :comments, :state
  end
end
