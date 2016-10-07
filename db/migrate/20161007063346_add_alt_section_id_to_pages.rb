class AddAltSectionIdToPages < ActiveRecord::Migration
  def change
    add_column :pages, :alt_section_id, :integer
  end
end
