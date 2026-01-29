class MakeBlocksOptionalFieldsNullable < ActiveRecord::Migration[8.1]
  def change
    change_column_default :blocks_productions, :water_cost, from: 0.0, to: nil
    change_column_default :blocks_productions, :electricity_cost, from: 0.0, to: nil
    change_column_default :blocks_productions, :blocks_sold, from: 0, to: nil
    change_column_default :blocks_productions, :amount_sold, from: 0.0, to: nil

    change_column_null :blocks_productions, :water_cost, true
    change_column_null :blocks_productions, :electricity_cost, true
    change_column_null :blocks_productions, :blocks_sold, true
    change_column_null :blocks_productions, :amount_sold, true
  end
end
