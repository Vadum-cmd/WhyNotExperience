import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { boatService, Boat, BoatFilters } from '../services/boatService';
import BoatCard from '../components/BoatCard';
import './BoatListPage.css';

const BoatListPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [boats, setBoats] = useState<Boat[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<BoatFilters>({});
  const [location, setLocation] = useState('Trieste');

  useEffect(() => {
    loadBoats();
  }, [filters]);

  useEffect(() => {
    const locationParam = searchParams.get('location');
    const dateParam = searchParams.get('date');
    const dateFrom = searchParams.get('dateFrom');
    const dateTo = searchParams.get('dateTo');
    
    if (locationParam) {
      setLocation(locationParam);
      setFilters(prev => ({ ...prev, location: locationParam }));
    }
    
    if (dateFrom) {
      setFilters(prev => ({ ...prev, dateFrom }));
    }
    if (dateTo) {
      setFilters(prev => ({ ...prev, dateTo }));
    }
    if (dateParam === 'today') {
      const today = new Date().toISOString().split('T')[0];
      setFilters(prev => ({ ...prev, dateFrom: today, dateTo: today }));
    }
  }, [searchParams]);

  const loadBoats = async () => {
    setLoading(true);
    try {
      const data = await boatService.getBoats(filters);
      setBoats(data);
    } catch (error) {
      console.error('Failed to load boats:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleBoatClick = (boatId: string) => {
    navigate(`/boats/${boatId}`);
  };

  const getDateDisplay = () => {
    if (filters.dateFrom) {
      const date = new Date(filters.dateFrom);
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }
    return new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <div className="boat-list-page">
      {/* Header */}
      <div className="boat-list-header">
        <button className="back-button" onClick={() => navigate('/')}>
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
        <div className="header-title">
          <h1>{location}</h1>
        </div>
        <button className="share-button">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M18 8C19.6569 8 21 6.65685 21 5C21 3.34315 19.6569 2 18 2C16.3431 2 15 3.34315 15 5C15 5.24077 15.0391 5.47199 15.1119 5.68864L8.88809 9.31136C8.36093 8.6998 7.52057 8.33333 6.5 8.33333C4.567 8.33333 3 9.90033 3 11.8333C3 13.7663 4.567 15.3333 6.5 15.3333C7.52057 15.3333 8.36093 14.9669 8.88809 14.3553L15.1119 17.978C15.0391 18.1946 15 18.4258 15 18.6667C15 20.5236 16.4764 22 18.3333 22C20.1903 22 21.6667 20.5236 21.6667 18.6667C21.6667 16.8097 20.1903 15.3333 18.3333 15.3333C17.313 15.3333 16.4726 15.6998 15.9454 16.3114L9.72164 12.6886C9.79448 12.472 9.83333 12.2408 9.83333 12C9.83333 11.7592 9.79448 11.528 9.72164 11.3114L15.9454 7.68864C16.4726 8.3002 17.313 8.66667 18.3333 8.66667H18Z"
              fill="currentColor"
            />
          </svg>
        </button>
      </div>

      {/* Content */}
      <div className="boat-list-content">
        <div className="boat-list-info">
          <p className="boat-count">{boats.length} boats available</p>
          <p className="boat-date-location">
            {getDateDisplay()} • {location}
          </p>
        </div>

        {loading ? (
          <div className="loading">Loading boats...</div>
        ) : boats.length === 0 ? (
          <div className="no-results">No boats found</div>
        ) : (
          <div className="boats-list">
            {boats.map((boat) => (
              <BoatCard
                key={boat.id}
                boat={boat}
                onClick={() => handleBoatClick(boat.id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BoatListPage;
