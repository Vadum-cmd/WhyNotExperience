import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { boatService, Boat } from '../services/boatService';
import { getUpcomingAvailability } from '../utils/dateUtils';
import StarRating from '../components/ui/StarRating';
import Button from '../components/ui/Button';
import RouteMap from '../components/RouteMap';
import './BoatDetailPage.css';

const BoatDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [boat, setBoat] = useState<Boat | null>(null);
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);
  const [activeTab, setActiveTab] = useState<'user' | 'host'>('user');
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  // Upcoming availability: next 2 days from today (must be before any early return)
  const upcomingAvailability = useMemo(
    () => getUpcomingAvailability(2, [['10:00 AM', '2:00 PM', '6:00 PM'], ['9:00 AM', '1:00 PM', '5:00 PM']]),
    []
  );

  useEffect(() => {
    if (id) {
      loadBoat();
    }
  }, [id]);

  const loadBoat = async () => {
    if (!id) return;
    try {
      const data = await boatService.getBoatById(id);
      setBoat(data);
    } catch (error: any) {
      console.error('Failed to load boat:', error);
      if (error.response?.status === 404) {
        // Boat not found - this is expected if database isn't seeded
        setBoat(null);
      }
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="boat-detail-page">
        <div className="loading">Loading...</div>
      </div>
    );
  }

  if (!boat) {
    return (
      <div className="boat-detail-page">
        <div className="error-container">
          <h2>Boat not found</h2>
          <p>The boat you're looking for doesn't exist in the database.</p>
          <p className="error-hint">
            <strong>Tip:</strong> Make sure the database has been seeded. 
            See <code>docs/DATABASE_SEEDING.md</code> for instructions.
          </p>
          <button className="back-to-list-button" onClick={() => navigate('/boats')}>
            Back to Boat List
          </button>
        </div>
      </div>
    );
  }

  const images = boat.images && boat.images.length > 0 ? boat.images : [
    'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800',
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
    'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800'
  ];

  const includedItems = [
    'WiFi',
    'Sound System',
    'Swimming Platform',
    'Snorkeling Gear',
    'Refreshments',
    'Life Jackets',
  ];

  // Route data - start and end points are in the water (Adriatic Sea)
  const routeStart = 'Marina San Giusto, Trieste (Water)';
  const routeEnd = 'Miramare Castle Area (Water)';

  return (
    <div className="boat-detail-page">
      {/* Header with Tabs */}
      <div className="boat-detail-header">
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
        <div className="header-tabs">
          <button
            className={`header-tab ${activeTab === 'user' ? 'header-tab-active' : ''}`}
            onClick={() => setActiveTab('user')}
          >
            User Flow
          </button>
          <button
            className={`header-tab ${activeTab === 'host' ? 'header-tab-active' : ''}`}
            onClick={() => setActiveTab('host')}
          >
            Host Flow
          </button>
        </div>
        <button className="search-button">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M21 21L16.65 16.65"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

      {/* Image Gallery Grid */}
      <div className="boat-detail-images">
        <div className="boat-detail-image boat-detail-image-large">
          <img src={images[0]} alt={`${boat.name} 1`} />
        </div>
        <div className="boat-detail-image">
          <img src={images[1]} alt={`${boat.name} 2`} />
            </div>
          <div className="boat-detail-image">
          <img src={images[2]} alt={`${boat.name} 3`} />
          </div>
      </div>

      {/* Content */}
      <div className="boat-detail-content">
        {/* Title & Rating */}
        <div className="boat-detail-title-section">
          <div className="boat-detail-title-row">
            <h1 className="boat-detail-title">{boat.name}</h1>
            <button
              className={`favorite-button ${isFavorite ? 'favorite-active' : ''}`}
              onClick={() => setIsFavorite(!isFavorite)}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  d="M20.84 4.61C20.3292 4.099 19.7228 3.69364 19.0554 3.41708C18.3879 3.14052 17.6725 2.99817 16.95 2.99817C16.2275 2.99817 15.5121 3.14052 14.8446 3.41708C14.1772 3.69364 13.5708 4.099 13.06 4.61L12 5.67L10.94 4.61C9.9083 3.57831 8.50903 2.99871 7.05 2.99871C5.59096 2.99871 4.19169 3.57831 3.16 4.61C2.1283 5.64169 1.54871 7.04097 1.54871 8.5C1.54871 9.95903 2.1283 11.3583 3.16 12.39L4.22 13.45L12 21.23L19.78 13.45L20.84 12.39C21.351 11.8792 21.7564 11.2728 22.0329 10.6054C22.3095 9.93789 22.4518 9.22248 22.4518 8.5C22.4518 7.77752 22.3095 7.0621 22.0329 6.39464C21.7564 5.72718 21.351 5.12075 20.84 4.61Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill={isFavorite ? 'currentColor' : 'none'}
                />
              </svg>
            </button>
          </div>
          <div className="boat-detail-rating-location">
            <div className="rating-group">
              <StarRating rating={boat.rating} size="small" showValue />
              <span className="review-count">({boat.reviewCount} reviews)</span>
            </div>
            <span className="location">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style={{ marginRight: '4px' }}>
                <path
                  d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13 15.87 2 12 2ZM12 11.5C10.62 11.5 9.5 10.38 9.5 9C9.5 7.62 10.62 6.5 12 6.5C13.38 6.5 14.5 7.62 14.5 9C14.5 10.38 13.38 11.5 12 11.5Z"
                  fill="currentColor"
                />
              </svg>
              {boat.location}, Italy
            </span>
          </div>
        </div>

        {/* Boat Details */}
        <div className="boat-detail-section">
          <h2 className="section-title">Boat Details</h2>
          <div className="boat-detail-specs-grid">
            <div className="boat-detail-spec-item">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 14C9.33 14 4 15.34 4 18V20H20V18C20 15.34 14.67 14 12 14Z"
                  fill="currentColor"
                />
              </svg>
              <span>{boat.capacity} people</span>
            </div>
            <div className="boat-detail-spec-item">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path
                  d="M7 14C8.66 14 10 12.66 10 11C10 9.34 8.66 8 7 8C5.34 8 4 9.34 4 11C4 12.66 5.34 14 7 14ZM7 10C7.55 10 8 10.45 8 11C8 11.55 7.55 12 7 12C6.45 12 6 11.55 6 11C6 10.45 6.45 10 7 10Z"
                  fill="currentColor"
                />
              </svg>
              <span>{boat.cabins} cabin{boat.cabins !== 1 ? 's' : ''}</span>
            </div>
            <div className="boat-detail-spec-item">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path
                  d="M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM19 19H5V8H19V19Z"
                  fill="currentColor"
                />
              </svg>
              <span>{boat.year}</span>
            </div>
            <div className="boat-detail-spec-item">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 2L2 7L12 12L22 7L12 2Z"
                  fill="currentColor"
                />
                <path
                  d="M2 17L12 22L22 17V12L12 17L2 12V17Z"
                  fill="currentColor"
                />
              </svg>
              <span>{boat.length} meters</span>
            </div>
          </div>
        </div>

        {/* About This Boat */}
        <div className="boat-detail-section">
          <h2 className="section-title">About this boat</h2>
          <p className="boat-description">
            Experience the Adriatic Sea aboard our beautiful yacht {boat.name}. Perfect for groups
            looking to explore the stunning coastline of {boat.location} with comfort and style.
          </p>
        </div>

        {/* What's Included */}
        <div className="boat-detail-section">
          <h2 className="section-title">What's included</h2>
          <div className="included-items-grid">
            {includedItems.map((item) => (
              <div key={item} className="included-item">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M9 16.17L4.83 12L3.41 13.41L9 19L21 7L19.59 5.59L9 16.17Z"
                    fill="#22C55E"
                  />
                </svg>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Your Host */}
        {boat.host && (
          <div className="boat-detail-section">
            <h2 className="section-title">Your Host</h2>
            <div className="host-card">
            <div className="host-avatar">
              {boat.host.avatar ? (
                <img src={boat.host.avatar} alt={boat.host.name} />
              ) : (
                  <div className="host-avatar-placeholder">
                    {boat.host.name.charAt(0).toUpperCase()}
                  </div>
              )}
            </div>
            <div className="host-info">
                <h3 className="host-name">{boat.host.name}</h3>
                <div className="host-rating">
                  <StarRating rating={5.0} size="small" showValue />
                  <span className="host-years">5 years hosting</span>
                </div>
                <div className="host-languages">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style={{ marginRight: '4px' }}>
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                    <path d="M2 12H22M12 2C15 6 15 18 12 22C9 18 9 6 12 2" stroke="currentColor" strokeWidth="2" />
                  </svg>
                  <span>Italian, English, German</span>
                </div>
                <div className="host-response">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style={{ marginRight: '4px' }}>
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                    <path d="M12 6V12L16 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                  <span>Response time: &lt; 1 hour</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Route Preview */}
        <div className="boat-detail-section">
          <h2 className="section-title">Route Preview</h2>
          <div className="route-preview">
            <RouteMap
              startLocation={routeStart}
              endLocation={routeEnd}
            />
            <div className="route-points">
              <div className="route-point route-point-start">
                <div className="route-point-marker route-point-marker-start" />
                <div>
                  <div className="route-point-label">Start</div>
                  <div className="route-point-location">{routeStart}</div>
                </div>
              </div>
              <div className="route-point route-point-end">
                <div className="route-point-marker route-point-marker-end" />
                <div>
                  <div className="route-point-label">End</div>
                  <div className="route-point-location">{routeEnd}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Upcoming Availability */}
        <div className="boat-detail-section">
          <h2 className="section-title">Upcoming Availability</h2>
          <div className="availability-list">
            {upcomingAvailability.map((availability, index) => (
              <div key={index} className="availability-item">
                <div className="availability-date">{availability.date}</div>
                <div className="availability-times">
                  {availability.times.map((time) => {
                    const isSelected = selectedDate === availability.date && selectedTime === time;
                    return (
                      <button
                        key={time}
                        className={`availability-time-slot ${isSelected ? 'selected' : ''}`}
                        onClick={() => {
                          setSelectedDate(availability.date);
                          setSelectedTime(time);
                        }}
                      >
                        {time}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
          {selectedDate && selectedTime && (
            <div className="selected-slot-info">
              <p>Selected: <strong>{selectedDate}</strong> at <strong>{selectedTime}</strong></p>
            </div>
          )}
        </div>

        {/* Pricing & CTA */}
        <div className="boat-detail-footer">
          <div className="boat-detail-pricing">
            <span className="pricing-label">From</span>
            <span className="pricing-value">€{boat.price}/hour</span>
          </div>
          {boat.experiences && boat.experiences.length > 0 && (
            <Button
              variant="primary"
              size="large"
              fullWidth
              onClick={() => {
                if (selectedDate && selectedTime) {
                  // Navigate to experiences page with selected date/time
                  navigate(`/boats/${boat.id}/experiences?date=${encodeURIComponent(selectedDate)}&time=${encodeURIComponent(selectedTime)}`);
                } else {
                  // Navigate without selection
                  navigate(`/boats/${boat.id}/experiences`);
                }
              }}
              className="select-experience-button"
            >
              {selectedDate && selectedTime ? `Continue with ${selectedTime}` : 'Select Experience'}
            </Button>
        )}
        </div>
      </div>
    </div>
  );
};

export default BoatDetailPage;
