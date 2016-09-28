class AddDeletedAtToPages < ActiveRecord::Migration
  def change
    add_column :pages, :deleted_at, :datetime
  end
end
