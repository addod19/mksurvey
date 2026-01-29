class SurveyRental < ApplicationRecord
  validates :machine_color, presence: true
  validates :last_four_digits, presence: true, length: { maximum: 4 }
  validates :rentee_name, presence: true
  validates :took_stick, inclusion: { in: [true, false] }
end
