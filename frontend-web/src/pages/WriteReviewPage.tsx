import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { bookingService, Booking } from '../services/bookingService';
import StarRating from '../components/ui/StarRating';
import Button from '../components/ui/Button';
import './WriteReviewPage.css';

const WriteReviewPage: React.FC = () => {
  const { bookingId } = useParams<{ bookingId: string }>();
  const navigate = useNavigate();
  const [booking, setBooking] = useState<Booking | null>(null);
  const [rating, setRating] = useState<number>(0);
  const [reviewText, setReviewText] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (bookingId) {
      loadBooking();
    }
  }, [bookingId]);

  const loadBooking = async () => {
    if (!bookingId) return;
    try {
      const data = await bookingService.getBookingById(bookingId);
      setBooking(data);
    } catch (error) {
      console.error('Failed to load booking:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (rating === 0) {
      alert('Please select a rating');
      return;
    }

    setSubmitting(true);
    try {
      // TODO: Call API to submit review
      console.log('Submitting review:', { bookingId, rating, reviewText });
      // Navigate back to profile after submission
      navigate('/profile');
    } catch (error) {
      console.error('Failed to submit review:', error);
      alert('Failed to submit review. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="write-review-page">
        <div className="loading">Loading...</div>
      </div>
    );
  }

  if (!booking) {
    return (
      <div className="write-review-page">
        <div className="error">Booking not found</div>
      </div>
    );
  }

  const getRatingLabel = (rating: number) => {
    if (rating === 0) return '';
    if (rating <= 2) return 'Poor';
    if (rating === 3) return 'Good';
    if (rating === 4) return 'Very Good';
    return 'Excellent';
  };

  return (
    <div className="write-review-page">
      {/* Header */}
      <div className="review-header">
        <button className="back-button" onClick={() => navigate(-1)}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M15 18L9 12L15 6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <h1 className="review-title">Write Review</h1>
        <div className="header-spacer" />
      </div>

      {/* Content */}
      <div className="review-content">
        {/* Experience Image */}
        <div className="review-experience-image">
          <img
            src="https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800"
            alt={booking.boatName}
          />
          <div className="experience-overlay">
            <div className="experience-name">{booking.boatName}</div>
          </div>
        </div>

        {/* Host Info */}
        <div className="review-host-info">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style={{ marginRight: '6px' }}>
            <path
              d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 14C9.33 14 4 15.34 4 18V20H20V18C20 15.34 14.67 14 12 14Z"
              fill="currentColor"
            />
          </svg>
          <span>Hosted by {booking.boatName.split(' ')[0]}</span>
        </div>

        {/* Rate Your Experience */}
        <div className="review-section">
          <h2 className="section-title">Rate your experience</h2>
          <p className="section-question">How would you rate this boat experience?</p>
          <div className="rating-container">
            <StarRating
              rating={rating}
              interactive={true}
              onRatingChange={setRating}
              size="large"
            />
            {rating > 0 && (
              <p className="rating-label">{getRatingLabel(rating)}</p>
            )}
          </div>
        </div>

        {/* Share Your Thoughts */}
        <div className="review-section">
          <h2 className="section-title">Share your thoughts</h2>
          <p className="section-hint">Tell others about your experience (optional)</p>
          <textarea
            className="review-textarea"
            placeholder="What made this experience special? Share details about the boat, the host, the route, or any memorable moments..."
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            rows={6}
            maxLength={500}
          />
          <div className="character-count">
            <span>{reviewText.length} characters</span>
            {reviewText.length > 0 && reviewText.length < 50 && (
              <span className="character-hint">Looking good!</span>
            )}
          </div>
        </div>

        {/* Review Tips */}
        <div className="review-tips">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" style={{ marginRight: '8px' }}>
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
            <path d="M12 16V12M12 8H12.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
          <div>
            <h3 className="tips-title">Review Tips</h3>
            <ul className="tips-list">
              <li>Be honest and constructive</li>
              <li>Mention specific details</li>
              <li>Keep it respectful</li>
              <li>Help future guests make decisions</li>
            </ul>
          </div>
        </div>

        {/* Submit Button */}
        <Button
          variant="primary"
          size="large"
          fullWidth
          onClick={handleSubmit}
          disabled={rating === 0 || submitting}
          className="submit-review-button"
        >
          {rating === 0 ? 'Select a rating to continue' : submitting ? 'Submitting...' : 'Submit Review'}
        </Button>
      </div>
    </div>
  );
};

export default WriteReviewPage;

