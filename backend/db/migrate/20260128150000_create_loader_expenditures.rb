class CreateLoaderExpenditures < ActiveRecord::Migration[8.1]
  def change
    create_table :loader_expenditures do |t|
      t.decimal :fuel, precision: 12, scale: 2, null: false
      t.decimal :washing, precision: 12, scale: 2, null: false
      t.decimal :greasing, precision: 12, scale: 2, null: false
      t.decimal :chop_money, precision: 12, scale: 2, null: false

      t.timestamps
    end

    add_index :loader_expenditures, :created_at
  end
end
