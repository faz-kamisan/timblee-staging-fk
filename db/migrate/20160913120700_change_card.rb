class ChangeCard < ActiveRecord::Migration
  def change
    change_column :cards, :last4, :string
  end
end
