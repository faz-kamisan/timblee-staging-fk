class RenameColumnCostInPlanToCostInCents < ActiveRecord::Migration
  def change
    rename_column :plans, :cost, :cost_in_cents
  end
end
