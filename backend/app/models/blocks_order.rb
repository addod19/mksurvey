class BlocksOrder < ApplicationRecord
  belongs_to :user, optional: true

  validates :buyer_name, presence: true
  validates :quantity, numericality: { only_integer: true, greater_than_or_equal_to: 0 }
  validates :unit_price, :total_price, numericality: { greater_than_or_equal_to: 0 }

  before_save :ensure_total_price

  STATUSES = %w[pending confirmed shipped delivered cancelled]

  def ensure_total_price
    self.total_price = (unit_price.to_d * quantity.to_i).round(2) if unit_price && quantity
  end

  def confirm!
    update!(status: 'confirmed')
  end
end
