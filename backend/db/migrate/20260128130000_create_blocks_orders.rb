class CreateBlocksOrders < ActiveRecord::Migration[8.1]
  def change
    create_table :blocks_orders do |t|
      t.string :buyer_name, null: false
      t.string :buyer_phone
      t.integer :quantity, null: false, default: 0
      t.decimal :unit_price, precision: 10, scale: 2, null: false, default: 0.0
      t.decimal :total_price, precision: 12, scale: 2, null: false, default: 0.0
      t.string :status, null: false, default: 'pending'
      t.text :notes
      t.references :user, foreign_key: true, null: true

      t.timestamps
    end

    add_index :blocks_orders, :status
  end
end
