class CreateBlocksProductions < ActiveRecord::Migration[8.1]
  def change
    create_table :blocks_productions do |t|
      t.string :block_size, null: false
      t.string :block_type, null: false
      t.integer :blocks_produced, null: false, default: 0
      t.integer :cement_bags, null: false, default: 0
      t.integer :dust_trips, null: false, default: 0
      t.decimal :dust_cost, precision: 12, scale: 2, null: false, default: 0.0
      t.decimal :manufacturing_pay, precision: 12, scale: 2, null: false, default: 0.0
      t.decimal :water_cost, precision: 12, scale: 2, null: false, default: 0.0
      t.decimal :electricity_cost, precision: 12, scale: 2, null: false, default: 0.0
      t.integer :blocks_sold, null: false, default: 0
      t.decimal :amount_sold, precision: 12, scale: 2, null: false, default: 0.0

      t.timestamps
    end

    add_index :blocks_productions, :created_at
  end
end
