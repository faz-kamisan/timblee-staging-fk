class ChangeStateDefaultInComments < ActiveRecord::Migration
  def change
    change_column :comments, :state, :string, default: 'active'
  end
end
