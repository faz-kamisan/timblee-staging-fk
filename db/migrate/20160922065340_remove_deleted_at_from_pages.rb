class RemoveDeletedAtFromPages < ActiveRecord::Migration
  def change
    remove_column :pages, :deleted_at
  end
end
