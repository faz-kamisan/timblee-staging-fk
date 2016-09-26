class AddFooterToPages < ActiveRecord::Migration
  def change
    add_column :pages, :footer, :boolean, default: false
  end
end
