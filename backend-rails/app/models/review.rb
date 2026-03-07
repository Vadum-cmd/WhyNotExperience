class Review < ApplicationRecord
  belongs_to :booking
  belongs_to :reviewer, class_name: 'User', foreign_key: 'reviewer_id'
  belongs_to :reviewee, class_name: 'User', foreign_key: 'reviewee_id'

  validates :rating, presence: true, numericality: { in: 1..5 }
  validates :comment, length: { maximum: 1000 }

  after_save :update_boat_rating

  private

  def update_boat_rating
    boat = booking.boat
    reviews = Review.joins(:booking).where(bookings: { boat_id: boat.id })
      .where.not(reviewer_id: boat.host_id)
    
    boat.update(
      rating: reviews.average(:rating).to_f.round(2),
      review_count: reviews.count
    )
  end
end

