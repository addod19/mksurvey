class LoaderRental < ApplicationRecord
  WORK_TYPES = %w[half_day full_day contract].freeze

  validates :work_type, presence: true, inclusion: { in: WORK_TYPES }
  validates :price_charged, presence: true, numericality: { greater_than_or_equal_to: 0 }
  validates :client_name, presence: true
  validates :client_contact, presence: true
end
