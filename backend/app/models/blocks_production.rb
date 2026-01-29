class BlocksProduction < ApplicationRecord
  BLOCK_SIZES = %w[5in 6in].freeze
  BLOCK_TYPES = %w[solid hollow].freeze

  validates :block_size, presence: true, inclusion: { in: BLOCK_SIZES }
  validates :block_type, presence: true, inclusion: { in: BLOCK_TYPES }
  validates :blocks_produced, presence: true, numericality: { greater_than_or_equal_to: 0 }
  validates :cement_bags, presence: true, numericality: { greater_than_or_equal_to: 0 }
  validates :dust_trips, presence: true, numericality: { greater_than_or_equal_to: 0 }
  validates :dust_cost, presence: true, numericality: { greater_than_or_equal_to: 0 }
  validates :manufacturing_pay, presence: true, numericality: { greater_than_or_equal_to: 0 }
  validates :water_cost, numericality: { greater_than_or_equal_to: 0 }, allow_nil: true
  validates :electricity_cost, numericality: { greater_than_or_equal_to: 0 }, allow_nil: true
  validates :blocks_sold, numericality: { greater_than_or_equal_to: 0 }, allow_nil: true
  validates :amount_sold, numericality: { greater_than_or_equal_to: 0 }, allow_nil: true
end
