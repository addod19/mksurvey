class CreateLoaderRentals < ActiveRecord::Migration[8.1]
  def change
    create_table :loader_rentals do |t|
      t.string :work_type, null: false
      t.decimal :price_charged, precision: 12, scale: 2, null: false
      t.string :client_name, null: false
      t.string :client_contact, null: false

      t.timestamps
    end

    add_index :loader_rentals, :created_at
  end
end
