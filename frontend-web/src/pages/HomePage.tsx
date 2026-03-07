import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/ui/Button';
import './HomePage.css';

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedDateOption, setSelectedDateOption] = useState<string | null>(null);

  const dateOptions = [
    { id: 'today', label: 'Today' },
    { id: 'tomorrow', label: 'Tomorrow' },
    { id: 'this-weekend', label: 'This Weekend' },
    { id: 'next-week', label: 'Next Week' },
  ];

  const popularExperiences = [
    {
      id: 'spritz-sail',
      name: 'Spritz & Sail',
      image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400',
      price: 'from €45',
    },
    {
      id: 'panorama-tour',
      name: 'Panorama Tour',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400',
      price: 'from €65',
    },
    {
      id: 'swim-experience',
      name: 'Swim Experience',
      image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400',
      price: 'from €80',
    },
    {
      id: 'full-day',
      name: 'Full Day Charter',
      image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400',
      price: 'from €120',
    },
  ];

  const handleSearch = () => {
    navigate('/boats');
  };

  return (
    <div className="home-page">
      {/* Hero Section */}
      <div className="home-hero">
        <div className="hero-image-container">
          <img
            src="https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1200"
            alt="Luxury yacht"
            className="hero-image"
          />
          <div className="hero-overlay">
            <h1 className="hero-title">Book your coastal adventure</h1>
            <p className="hero-subtitle">Discover unique boat experiences</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="home-content">
        {/* Date Selection */}
        <div className="date-selection-section">
          <h2 className="section-label">When?</h2>
          <p className="section-hint">Select date</p>
          <div className="date-options">
            {dateOptions.map((option) => (
              <button
                key={option.id}
                className={`date-chip ${selectedDateOption === option.id ? 'date-chip-active' : ''}`}
                onClick={() => setSelectedDateOption(option.id)}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {/* Search Button */}
        <div className="search-section">
          <Button variant="primary" size="large" fullWidth onClick={handleSearch}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" style={{ marginRight: '8px' }}>
              <path
                d="M9 17C13.4183 17 17 13.4183 17 9C17 4.58172 13.4183 1 9 1C4.58172 1 1 4.58172 1 9C1 13.4183 4.58172 17 9 17Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M19 19L14.65 14.65"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Search Boats
          </Button>
        </div>

        {/* Popular Experiences */}
        <div className="popular-experiences-section">
          <h2 className="section-title">Popular Experiences</h2>
          <div className="experiences-grid">
            {popularExperiences.map((experience) => (
              <div
                key={experience.id}
                className="experience-card"
                onClick={() => navigate('/boats')}
              >
                <img
                  src={experience.image}
                  alt={experience.name}
                  className="experience-image"
                />
                <div className="experience-overlay">
                  <p className="experience-price">{experience.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
