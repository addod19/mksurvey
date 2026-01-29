class CreateSurveyRentals < ActiveRecord::Migration[8.1]
  def change
    create_table :survey_rentals do |t|
      t.string :machine_color, null: false
      t.string :last_four_digits, null: false
      t.string :rentee_name, null: false
      t.boolean :took_stick, null: false, default: false
      t.integer :points

      t.timestamps
    end

    add_index :survey_rentals, :created_at
  end
end
