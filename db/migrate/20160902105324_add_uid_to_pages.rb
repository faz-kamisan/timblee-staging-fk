class AddUidToPages < ActiveRecord::Migration
  def change
    add_column :pages, :uid, :integer
  end
end
