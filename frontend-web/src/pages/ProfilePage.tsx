import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { bookingService, Booking } from '../services/bookingService';
import Tabs from '../components/ui/Tabs';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import './ProfilePage.css';

const ProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past'>('upcoming');

  useEffect(() => {
    if (user) {
      loadBookings();
    }
  }, [user]);

  const loadBookings = async () => {
    try {
      const data = await bookingService.getBookings();
      setBookings(data);
    } catch (error) {
      console.error('Failed to load bookings:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    navigate('/login');
    return null;
  }

  const now = new Date();
  const upcomingBookings = bookings.filter(
    (booking) => new Date(booking.date) >= now && booking.status !== 'cancelled'
  );
  const pastBookings = bookings.filter(
    (booking) => new Date(booking.date) < now || booking.status === 'completed'
  );

  const displayBookings = activeTab === 'upcoming' ? upcomingBookings : pastBookings;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <div className="profile-page">
      <div className="profile-header">
        <h1 className="profile-title">My Events</h1>
        <button className="logout-button" onClick={logout}>
          Logout
        </button>
      </div>

      <div className="profile-content">
        <Tabs
          tabs={[
            { id: 'upcoming', label: 'Upcoming', count: upcomingBookings.length },
            { id: 'past', label: 'Past', count: pastBookings.length },
          ]}
          activeTab={activeTab}
          onChange={(tabId) => setActiveTab(tabId as 'upcoming' | 'past')}
          className="events-tabs"
        />

        {loading ? (
          <div className="loading">Loading events...</div>
        ) : displayBookings.length === 0 ? (
          <div className="no-events">
            {activeTab === 'upcoming' ? 'No upcoming events' : 'No past events'}
          </div>
        ) : (
          <div className="events-list">
            {displayBookings.map((booking) => (
              <Card key={booking.id} className="event-card">
                <div className="event-image-container">
                  <img
                    src="https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800"
                    alt={booking.boatName}
                    className="event-image"
                  />
                  <div className="event-overlay">
                    <div className="event-boat-name">{booking.boatName}</div>
                  </div>
                </div>

                <div className="event-content">
                  <div className="event-details">
                    <div className="event-date-time">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style={{ marginRight: '6px' }}>
                        <path
                          d="M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM19 19H5V8H19V19Z"
                          fill="currentColor"
                        />
                      </svg>
                      {formatDate(booking.date)} at {booking.startTime}
                    </div>
                    <div className="event-route">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style={{ marginRight: '6px' }}>
                        <path
                          d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13 15.87 2 12 2ZM12 11.5C10.62 11.5 9.5 10.38 9.5 9C9.5 7.62 10.62 6.5 12 6.5C13.38 6.5 14.5 7.62 14.5 9C14.5 10.38 13.38 11.5 12 11.5Z"
                          fill="currentColor"
                        />
                      </svg>
                      Marina San Giusto, Trieste
                    </div>
                    <div className="event-host">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style={{ marginRight: '6px' }}>
                        <path
                          d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 14C9.33 14 4 15.34 4 18V20H20V18C20 15.34 14.67 14 12 14Z"
                          fill="currentColor"
                        />
                      </svg>
                      Hosted by {booking.boatName.split(' ')[0]}
                      <button className="message-button">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style={{ marginLeft: '8px' }}>
                          <path
                            d="M20 2H4C2.9 2 2 2.9 2 4V22L6 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2Z"
                            fill="currentColor"
                          />
                        </svg>
                        Message
                      </button>
                    </div>
                  </div>

                  {activeTab === 'upcoming' && (
                    <Button
                      variant="primary"
                      size="medium"
                      fullWidth
                      onClick={() => {
                        // Handle check-in
                        console.log('Check in for booking:', booking.id);
                      }}
                      className="check-in-button"
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" style={{ marginRight: '8px' }}>
                        <path
                          d="M9 16.17L4.83 12L3.41 13.41L9 19L21 7L19.59 5.59L9 16.17Z"
                          fill="currentColor"
                        />
                      </svg>
                      Check In
                    </Button>
                  )}

                  {activeTab === 'past' && (
                    <div className="event-review-section">
                      {booking.status === 'completed' ? (
                        <div className="review-status">
                          <div className="review-status-item">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                              <path
                                d="M9 16.17L4.83 12L3.41 13.41L9 19L21 7L19.59 5.59L9 16.17Z"
                                fill="#22C55E"
                              />
                            </svg>
                            <span>Your Review</span>
                            <span className="review-rating">★5.0</span>
                          </div>
                        </div>
                      ) : (
                        <div className="review-prompt">
                          <h4 className="review-prompt-title">Share your experience</h4>
                          <p className="review-prompt-subtitle">Help others by writing a review</p>
                          <Button
                            variant="primary"
                            size="medium"
                            fullWidth
                            onClick={() => navigate(`/reviews/${booking.id}/write`)}
                          >
                            Write Review
                          </Button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
