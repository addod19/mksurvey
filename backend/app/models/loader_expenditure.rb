class LoaderExpenditure < ApplicationRecord
  validates :fuel, presence: true, numericality: { greater_than_or_equal_to: 0 }
  validates :washing, presence: true, numericality: { greater_than_or_equal_to: 0 }
  validates :greasing, presence: true, numericality: { greater_than_or_equal_to: 0 }
  validates :chop_money, presence: true, numericality: { greater_than_or_equal_to: 0 }
end
