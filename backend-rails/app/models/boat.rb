class Boat < ApplicationRecord
  belongs_to :host, class_name: 'User', foreign_key: 'host_id'
  has_many :experiences, dependent: :destroy
  has_many :bookings, dependent: :destroy

  validates :name, presence: true
  validates :model, presence: true
  validates :year, presence: true, numericality: { greater_than: 1900, less_than_or_equal_to: Date.current.year + 1 }
  validates :location, presence: true
  validates :capacity, presence: true, numericality: { greater_than: 0 }
  validates :cabins, presence: true, numericality: { greater_than_or_equal_to: 0 }
  validates :length, presence: true, numericality: { greater_than: 0 }
  validates :price, presence: true, numericality: { greater_than: 0 }

  scope :by_location, ->(location) { where("location ILIKE ?", "%#{location}%") }
  scope :by_price_range, ->(min, max) { where(price: min..max) }
  scope :by_rating, ->(min_rating) { where("rating >= ?", min_rating) }
  scope :by_capacity, ->(min_capacity) { where("capacity >= ?", min_capacity) }

  def available_dates(start_date: nil, end_date: nil)
    start_date ||= Date.current
    end_date ||= 30.days.from_now.to_date

    booked_dates = bookings
      .where(status: ['pending', 'confirmed'])
      .where(date: start_date..end_date)
      .pluck(:date)
      .to_set

    (start_date..end_date).select { |date| !booked_dates.include?(date) }
  end
end

