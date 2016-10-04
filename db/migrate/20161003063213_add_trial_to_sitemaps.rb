class AddTrialToSitemaps < ActiveRecord::Migration
  def change
    add_column :sitemaps, :trial, :boolean, default: false
  end
end
