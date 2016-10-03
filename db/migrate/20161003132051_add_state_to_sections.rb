class AddStateToSections < ActiveRecord::Migration
  def change
    add_column :sections, :state, :string, default: 'active'
  end
end
