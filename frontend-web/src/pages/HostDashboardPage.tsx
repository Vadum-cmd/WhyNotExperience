import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { addDays, toISO } from '../utils/dateUtils';
import Tabs from '../components/ui/Tabs';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import StarRating from '../components/ui/StarRating';
import './HostDashboardPage.css';

interface BookingRequest {
  id: string;
  boatName: string;
  guestName: string;
  guestAvatar?: string;
  date: string;
  time: string;
  guests: number;
  experienceName: string;
  totalPrice: number;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
}

interface Review {
  id: string;
  guestName: string;
  guestAvatar?: string;
  boatName: string;
  rating: number;
  reviewText: string;
  date: string;
}

const HostDashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'requests' | 'upcoming' | 'past' | 'reviews'>('requests');
  
  // Mock data with dates relative to today (would come from API)
  const tomorrow = toISO(addDays(new Date(), 1));
  const dayAfter = toISO(addDays(new Date(), 2));
  const inThreeDays = toISO(addDays(new Date(), 3));
  const fiveDaysAgo = toISO(addDays(new Date(), -5));
  const twoDaysAgo = toISO(addDays(new Date(), -2));

  const [requests, setRequests] = useState<BookingRequest[]>([
    {
      id: '1',
      boatName: 'Azzurra',
      guestName: 'John Doe',
      date: tomorrow,
      time: '10:00 AM',
      guests: 4,
      experienceName: 'Spritz & Sail',
      totalPrice: 180,
      status: 'pending',
    },
    {
      id: '2',
      boatName: 'Azzurra',
      guestName: 'Jane Smith',
      date: dayAfter,
      time: '2:00 PM',
      guests: 2,
      experienceName: 'Panorama Tour',
      totalPrice: 130,
      status: 'pending',
    },
  ]);

  const [upcomingBookings, setUpcomingBookings] = useState<BookingRequest[]>([
    {
      id: '3',
      boatName: 'Azzurra',
      guestName: 'Mike Johnson',
      date: inThreeDays,
      time: '9:00 AM',
      guests: 6,
      experienceName: 'Full Day Charter',
      totalPrice: 720,
      status: 'confirmed',
    },
  ]);

  const [pastBookings, setPastBookings] = useState<BookingRequest[]>([
    {
      id: '4',
      boatName: 'Azzurra',
      guestName: 'Sarah Williams',
      date: fiveDaysAgo,
      time: '10:00 AM',
      guests: 3,
      experienceName: 'Spritz & Sail',
      totalPrice: 135,
      status: 'completed',
    },
  ]);

  const [reviews, setReviews] = useState<Review[]>([
    {
      id: '1',
      guestName: 'Sarah Williams',
      boatName: 'Azzurra',
      rating: 5.0,
      reviewText: 'Amazing experience! The boat was beautiful and the host was very accommodating.',
      date: twoDaysAgo,
    },
  ]);

  const handleAcceptRequest = (requestId: string) => {
    setRequests((prev) => prev.filter((r) => r.id !== requestId));
    // Move to upcoming bookings
    const request = requests.find((r) => r.id === requestId);
    if (request) {
      setUpcomingBookings((prev) => [...prev, { ...request, status: 'confirmed' }]);
    }
  };

  const handleDeclineRequest = (requestId: string) => {
    setRequests((prev) => prev.filter((r) => r.id !== requestId));
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const getGuestInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="host-dashboard-page">
      {/* Header */}
      <div className="dashboard-header">
        <h1 className="dashboard-title">Host Dashboard</h1>
        <Button variant="primary" size="medium" onClick={() => navigate('/host/listing/create')}>
          Create Listing
        </Button>
      </div>

      {/* Tabs */}
      <div className="dashboard-tabs-container">
        <Tabs
          tabs={[
            { id: 'requests', label: 'Requests', count: requests.length },
            { id: 'upcoming', label: 'Upcoming', count: upcomingBookings.length },
            { id: 'past', label: 'Past', count: pastBookings.length },
            { id: 'reviews', label: 'Reviews', count: reviews.length },
          ]}
          activeTab={activeTab}
          onChange={(tabId) => setActiveTab(tabId as typeof activeTab)}
        />
      </div>

      {/* Content */}
      <div className="dashboard-content">
        {/* Requests Tab */}
        {activeTab === 'requests' && (
          <div className="requests-list">
            {requests.length === 0 ? (
              <div className="empty-state">No pending requests</div>
            ) : (
              requests.map((request) => (
                <Card key={request.id} className="request-card">
                  <div className="request-header">
                    <div className="guest-info">
                      <div className="guest-avatar">
                        {request.guestAvatar ? (
                          <img src={request.guestAvatar} alt={request.guestName} />
                        ) : (
                          <div className="guest-avatar-placeholder">
                            {getGuestInitials(request.guestName)}
                          </div>
                        )}
                      </div>
                      <div>
                        <div className="guest-name">{request.guestName}</div>
                        <div className="request-boat">{request.boatName}</div>
                      </div>
                    </div>
                    <div className="request-price">€{request.totalPrice}</div>
                  </div>

                  <div className="request-details">
                    <div className="request-detail-item">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                        <path
                          d="M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM19 19H5V8H19V19Z"
                          fill="currentColor"
                        />
                      </svg>
                      {formatDate(request.date)} at {request.time}
                    </div>
                    <div className="request-detail-item">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                        <path
                          d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 14C9.33 14 4 15.34 4 18V20H20V18C20 15.34 14.67 14 12 14Z"
                          fill="currentColor"
                        />
                      </svg>
                      {request.guests} guest{request.guests !== 1 ? 's' : ''}
                    </div>
                    <div className="request-detail-item">
                      <span className="experience-badge">{request.experienceName}</span>
                    </div>
                  </div>

                  <div className="request-actions">
                    <Button
                      variant="outline"
                      size="medium"
                      onClick={() => handleDeclineRequest(request.id)}
                    >
                      Decline
                    </Button>
                    <Button
                      variant="primary"
                      size="medium"
                      onClick={() => handleAcceptRequest(request.id)}
                    >
                      Accept
                    </Button>
                  </div>
                </Card>
              ))
            )}
          </div>
        )}

        {/* Upcoming Tab */}
        {activeTab === 'upcoming' && (
          <div className="bookings-list">
            {upcomingBookings.length === 0 ? (
              <div className="empty-state">No upcoming bookings</div>
            ) : (
              upcomingBookings.map((booking) => (
                <Card key={booking.id} className="booking-card">
                  <div className="booking-header">
                    <div className="guest-info">
                      <div className="guest-avatar">
                        {booking.guestAvatar ? (
                          <img src={booking.guestAvatar} alt={booking.guestName} />
                        ) : (
                          <div className="guest-avatar-placeholder">
                            {getGuestInitials(booking.guestName)}
                          </div>
                        )}
                      </div>
                      <div>
                        <div className="guest-name">{booking.guestName}</div>
                        <div className="booking-boat">{booking.boatName}</div>
                      </div>
                    </div>
                    <div className="booking-status confirmed">Confirmed</div>
                  </div>

                  <div className="booking-details">
                    <div className="booking-detail-item">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                        <path
                          d="M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM19 19H5V8H19V19Z"
                          fill="currentColor"
                        />
                      </svg>
                      {formatDate(booking.date)} at {booking.time}
                    </div>
                    <div className="booking-detail-item">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                        <path
                          d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 14C9.33 14 4 15.34 4 18V20H20V18C20 15.34 14.67 14 12 14Z"
                          fill="currentColor"
                        />
                      </svg>
                      {booking.guests} guest{booking.guests !== 1 ? 's' : ''}
                    </div>
                    <div className="booking-detail-item">
                      <span className="experience-badge">{booking.experienceName}</span>
                    </div>
                  </div>

                  <div className="booking-footer">
                    <div className="booking-price">€{booking.totalPrice}</div>
                    <Button variant="outline" size="small" onClick={() => navigate(`/host/bookings/${booking.id}`)}>
                      View Details
                    </Button>
                  </div>
                </Card>
              ))
            )}
          </div>
        )}

        {/* Past Tab */}
        {activeTab === 'past' && (
          <div className="bookings-list">
            {pastBookings.length === 0 ? (
              <div className="empty-state">No past bookings</div>
            ) : (
              pastBookings.map((booking) => (
                <Card key={booking.id} className="booking-card">
                  <div className="booking-header">
                    <div className="guest-info">
                      <div className="guest-avatar">
                        {booking.guestAvatar ? (
                          <img src={booking.guestAvatar} alt={booking.guestName} />
                        ) : (
                          <div className="guest-avatar-placeholder">
                            {getGuestInitials(booking.guestName)}
                          </div>
                        )}
                      </div>
                      <div>
                        <div className="guest-name">{booking.guestName}</div>
                        <div className="booking-boat">{booking.boatName}</div>
                      </div>
                    </div>
                    <div className="booking-status completed">Completed</div>
                  </div>

                  <div className="booking-details">
                    <div className="booking-detail-item">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                        <path
                          d="M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM19 19H5V8H19V19Z"
                          fill="currentColor"
                        />
                      </svg>
                      {formatDate(booking.date)} at {booking.time}
                    </div>
                    <div className="booking-detail-item">
                      <span className="experience-badge">{booking.experienceName}</span>
                    </div>
                  </div>

                  <div className="booking-footer">
                    <div className="booking-price">€{booking.totalPrice}</div>
                  </div>
                </Card>
              ))
            )}
          </div>
        )}

        {/* Reviews Tab */}
        {activeTab === 'reviews' && (
          <div className="reviews-list">
            {reviews.length === 0 ? (
              <div className="empty-state">No reviews yet</div>
            ) : (
              reviews.map((review) => (
                <Card key={review.id} className="review-card">
                  <div className="review-header">
                    <div className="guest-info">
                      <div className="guest-avatar">
                        {review.guestAvatar ? (
                          <img src={review.guestAvatar} alt={review.guestName} />
                        ) : (
                          <div className="guest-avatar-placeholder">
                            {getGuestInitials(review.guestName)}
                          </div>
                        )}
                      </div>
                      <div>
                        <div className="guest-name">{review.guestName}</div>
                        <div className="review-boat">{review.boatName}</div>
                      </div>
                    </div>
                    <div className="review-rating">
                      <StarRating rating={review.rating} size="small" showValue />
                    </div>
                  </div>

                  <p className="review-text">{review.reviewText}</p>

                  <div className="review-date">{formatDate(review.date)}</div>
                </Card>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default HostDashboardPage;
