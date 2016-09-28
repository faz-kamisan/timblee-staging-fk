class AddStateToPages < ActiveRecord::Migration
  def change
    add_column :pages, :state, :string, default: 'active'
  end
end
