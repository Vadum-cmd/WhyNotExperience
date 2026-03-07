class Booking < ApplicationRecord
  belongs_to :user
  belongs_to :boat
  belongs_to :experience
  has_many :reviews, dependent: :destroy

  enum :status, { pending: 'pending', confirmed: 'confirmed', completed: 'completed', cancelled: 'cancelled' }

  validates :date, presence: true
  validates :start_time, presence: true
  validates :end_time, presence: true
  validates :duration, presence: true, numericality: { greater_than: 0 }
  validates :guests, presence: true, numericality: { greater_than: 0 }
  validates :total_price, presence: true, numericality: { greater_than_or_equal_to: 0 }

  validate :date_not_in_past
  validate :capacity_check

  before_validation :calculate_end_time, if: -> { start_time.present? && duration.present? }
  before_validation :calculate_total_price, if: -> { experience.present? && guests.present? }

  private

  def date_not_in_past
    errors.add(:date, "cannot be in the past") if date.present? && date < Date.current
  end

  def capacity_check
    return unless boat.present? && date.present? && start_time.present? && end_time.present?

    overlapping_bookings = Booking
      .where(boat_id: boat_id, date: date, status: ['pending', 'confirmed'])
      .where.not(id: id)
      .where(
        "(start_time <= ? AND end_time > ?) OR (start_time < ? AND end_time >= ?) OR (start_time >= ? AND end_time <= ?)",
        start_time, start_time, end_time, end_time, start_time, end_time
      )

    total_guests = overlapping_bookings.sum(:guests) + (guests || 0)
    if total_guests > boat.capacity
      errors.add(:guests, "exceeds available capacity for this time slot")
    end
  end

  def calculate_end_time
    return unless start_time.present? && duration.present?

    time_str = start_time.respond_to?(:strftime) ? start_time.strftime("%H:%M:%S") : start_time.to_s
    start_datetime = Time.zone.parse("#{date} #{time_str}")
    self.end_time = (start_datetime + duration.hours).strftime("%H:%M:%S")
  end

  def calculate_total_price
    return unless experience.present? && guests.present?

    self.total_price = experience.price * guests
  end
end

