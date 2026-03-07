import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { bookingService, Booking } from '../services/bookingService';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import './BookingConfirmationPage.css';

const BookingConfirmationPage: React.FC = () => {
  const { bookingId } = useParams<{ bookingId: string }>();
  const navigate = useNavigate();
  const [booking, setBooking] = useState<Booking | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (bookingId) {
      bookingService
        .getBookingById(bookingId)
        .then(setBooking)
        .catch(() => setError('Booking not found'))
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
      setError('Missing booking ID');
    }
  }, [bookingId]);

  if (loading) {
    return (
      <div className="booking-confirmation-page">
        <div className="loading">Loading...</div>
      </div>
    );
  }

  if (error || !booking) {
    return (
      <div className="booking-confirmation-page">
        <Card className="confirmation-card error-card">
          <h1>Something went wrong</h1>
          <p>{error || 'Booking not found.'}</p>
          <Button variant="primary" onClick={() => navigate('/boats')}>
            Back to Boats
          </Button>
        </Card>
      </div>
    );
  }

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr + 'T00:00:00');
    return d.toLocaleDateString(undefined, { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' });
  };

  return (
    <div className="booking-confirmation-page">
      <Card className="confirmation-card">
        <div className="confirmation-success-icon">✓</div>
        <h1>Booking confirmed</h1>
        <p className="confirmation-subtitle">Your experience has been reserved.</p>

        <div className="confirmation-details">
          <div className="confirmation-row">
            <span className="label">Boat</span>
            <span className="value">{booking.boatName}</span>
          </div>
          <div className="confirmation-row">
            <span className="label">Experience</span>
            <span className="value">{booking.experienceName}</span>
          </div>
          <div className="confirmation-row">
            <span className="label">Date</span>
            <span className="value">{formatDate(booking.date)}</span>
          </div>
          <div className="confirmation-row">
            <span className="label">Time</span>
            <span className="value">{booking.startTime} – {booking.endTime}</span>
          </div>
          <div className="confirmation-row">
            <span className="label">Total</span>
            <span className="value">€{booking.totalPrice}</span>
          </div>
          <div className="confirmation-row status">
            <span className="label">Status</span>
            <span className={`value status-badge status-${booking.status}`}>{booking.status}</span>
          </div>
        </div>

        <p className="confirmation-note">
          You can view and manage this booking in your Profile.
        </p>

        <div className="confirmation-actions">
          <Button variant="primary" onClick={() => navigate('/profile')}>
            View my bookings
          </Button>
          <Button variant="outline" onClick={() => navigate('/boats')}>
            Browse more boats
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default BookingConfirmationPage;
