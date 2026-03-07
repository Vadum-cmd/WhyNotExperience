import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import { boatService, Boat, Experience } from '../services/boatService';
import { bookingService } from '../services/bookingService';
import { useAuth } from '../contexts/AuthContext';
import { getNextDays } from '../utils/dateUtils';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import TimePicker from '../components/ui/TimePicker';
import './BookingPage.css';

/** Convert "09:00 AM" / "1:00 PM" to 24h "09:00:00" / "13:00:00" for the API */
function toApiTime(displayTime: string): string {
  const match = displayTime.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
  if (!match) return displayTime.replace(/\s/g, '');
  let [, hourStr, min, period] = match;
  let hour = parseInt(hourStr!, 10);
  if (period!.toUpperCase() === 'PM' && hour !== 12) hour += 12;
  if (period!.toUpperCase() === 'AM' && hour === 12) hour = 0;
  return `${hour.toString().padStart(2, '0')}:${min}:00`;
}

const BookingPage: React.FC = () => {
  const { boatId } = useParams<{ boatId: string }>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [boat, setBoat] = useState<Boat | null>(null);
  const [experience, setExperience] = useState<Experience | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate(`/login?returnTo=${encodeURIComponent(window.location.pathname + window.location.search)}`);
      return;
    }
    if (boatId) {
      loadBoat();
    }
  }, [boatId, isAuthenticated, navigate]);

  useEffect(() => {
    const experienceId = searchParams.get('experienceId');
    if (boat && experienceId && boat.experiences) {
      const exp = boat.experiences.find((e) => e.id === experienceId);
      if (exp) {
        setExperience(exp);
      }
    }
  }, [boat, searchParams]);

  const loadBoat = async () => {
    if (!boatId) return;
    try {
      const data = await boatService.getBoatById(boatId);
      setBoat(data);
    } catch (error) {
      console.error('Failed to load boat:', error);
    } finally {
      setLoading(false);
    }
  };

  // Available dates: next 7 days from today (would come from API in production)
  const availableDates = useMemo(() => getNextDays(7), []);

  // Mock available times (would come from API based on selected date)
  const availableTimes = ['09:00 AM', '10:00 AM', '1:00 PM', '2:00 PM', '5:00 PM', '6:00 PM'];

  const totalPrice = experience ? experience.price : 0;

  const handleContinue = async () => {
    if (!selectedDate || !selectedTime || !boatId || !experience) return;
    setSubmitError(null);
    setSubmitting(true);
    try {
      const booking = await bookingService.createBooking({
        boatId,
        experienceId: experience.id,
        date: selectedDate,
        startTime: toApiTime(selectedTime),
        guests: 1,
      });
      navigate(`/booking/confirmation/${booking.id}`);
    } catch (err: unknown) {
      const ax = err as {
        response?: {
          data?: unknown;
          status?: number;
        };
        message?: string;
      };
      if (process.env.NODE_ENV !== 'production') {
        console.error('Booking error:', ax.response?.status, ax.response?.data, ax.message);
      }
      const data = ax.response?.data;
      const dataObj = data && typeof data === 'object' ? (data as Record<string, unknown>) : null;
      const errorsArr = dataObj?.errors;
      const errorStr =
        typeof dataObj?.error === 'string'
          ? dataObj.error
          : Array.isArray(errorsArr)
            ? (errorsArr as string[]).join(', ')
            : typeof dataObj?.message === 'string'
              ? dataObj.message
              : '';
      const status = ax.response?.status;
      const message =
        errorStr ||
        (status === 422 && 'Invalid booking (e.g. date in the past or slot unavailable).') ||
        (status === 401 && 'Please log in again.') ||
        (status === 403 && 'You are not allowed to create this booking.') ||
        (status && status >= 500 && 'Server error. Please try again later.') ||
        (ax.message && typeof ax.message === 'string' && ax.message) ||
        'Booking failed. Please try again.';
      setSubmitError(message);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="booking-page">
        <div className="loading">Loading...</div>
      </div>
    );
  }

  if (!boat || !experience) {
    return (
      <div className="booking-page">
        <div className="error">Boat or experience not found</div>
      </div>
    );
  }

  return (
    <div className="booking-page">
      {/* Header */}
      <div className="booking-header">
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
        <h1 className="booking-title">Select Date & Time</h1>
        <div className="header-spacer" />
      </div>

      {/* Content */}
      <div className="booking-content">
        {/* Booking Summary */}
        <Card className="booking-summary-card">
          <h2 className="summary-title">Booking Summary</h2>
          <div className="summary-item">
            <span className="summary-label">Boat:</span>
            <span className="summary-value">{boat.name}</span>
          </div>
          <div className="summary-item">
            <span className="summary-label">Experience:</span>
            <span className="summary-value">{experience.name}</span>
          </div>
          <div className="summary-item">
            <span className="summary-label">Duration:</span>
            <span className="summary-value">{experience.duration} hour{experience.duration !== 1 ? 's' : ''}</span>
          </div>
        </Card>

        {/* Date Selection */}
        <div className="booking-section">
          <h2 className="section-title">Select Date</h2>
          <div className="date-cards">
            {availableDates.map((dateOption) => (
              <button
                key={dateOption.value}
                className={`date-card ${selectedDate === dateOption.value ? 'date-card-selected' : ''}`}
                onClick={() => {
                  setSelectedDate(dateOption.value);
                  setSelectedTime(null); // Reset time when date changes
                }}
              >
                <div className="date-card-label">{dateOption.label}</div>
                <div className="date-card-date">{dateOption.date}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Time Selection */}
        {selectedDate && (
          <div className="booking-section">
            <h2 className="section-title">Select Time</h2>
            <TimePicker
              times={availableTimes}
              selectedTime={selectedTime}
              onTimeSelect={setSelectedTime}
            />
          </div>
        )}

        {/* Total & Continue */}
        <div className="booking-footer">
          {submitError && (
            <div className="booking-error" role="alert">
              {submitError}
            </div>
          )}
          <div className="booking-total">
            <span className="total-label">Total</span>
            <span className="total-value">€{totalPrice}</span>
          </div>
          {selectedDate && selectedTime && (
            <div className="booking-selection-info">
              {availableDates.find((d) => d.value === selectedDate)?.date} at {selectedTime}
            </div>
          )}
          <Button
            variant="primary"
            size="large"
            fullWidth
            onClick={handleContinue}
            disabled={!selectedDate || !selectedTime || submitting}
          >
            {submitting ? 'Booking…' : 'Continue to Payment'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;
