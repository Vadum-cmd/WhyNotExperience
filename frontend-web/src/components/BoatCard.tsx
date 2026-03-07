import React, { useState } from 'react';
import { Boat } from '../services/boatService';
import StarRating from './ui/StarRating';
import './BoatCard.css';

interface BoatCardProps {
  boat: Boat;
  onClick: () => void;
}

const BoatCard: React.FC<BoatCardProps> = ({ boat, onClick }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const images = boat.images && boat.images.length > 0 ? boat.images : [
    'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800'
  ];

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };

  const handlePrevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
  };

  const handleNextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));
  };

  return (
    <div className="boat-card" onClick={onClick}>
      {/* Image Carousel */}
      <div className="boat-card-image-container">
        <img
          src={images[currentImageIndex]}
          alt={boat.name}
          className="boat-card-image"
        />
        
        {/* Navigation Arrows */}
        {images.length > 1 && (
          <>
            <button
              className="boat-card-nav boat-card-nav-prev"
              onClick={handlePrevImage}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path
                  d="M15 18L9 12L15 6"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <button
              className="boat-card-nav boat-card-nav-next"
              onClick={handleNextImage}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path
                  d="M9 18L15 12L9 6"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </>
        )}

        {/* Favorite Button */}
        <button
          className={`boat-card-favorite ${isFavorite ? 'boat-card-favorite-active' : ''}`}
          onClick={handleFavoriteClick}
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

        {/* Image Indicators */}
        {images.length > 1 && (
          <div className="boat-card-indicators">
            {images.map((_, index) => (
              <div
                key={index}
                className={`boat-card-indicator ${index === currentImageIndex ? 'boat-card-indicator-active' : ''}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="boat-card-content">
        <div className="boat-card-header">
          <h3 className="boat-card-title">{boat.name}</h3>
          <div className="boat-card-rating">
            <StarRating rating={boat.rating} size="small" showValue />
            <span className="boat-card-review-count">({boat.reviewCount} reviews)</span>
          </div>
        </div>

        <div className="boat-card-specs">
          <div className="boat-card-spec">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13 15.87 2 12 2ZM12 11.5C10.62 11.5 9.5 10.38 9.5 9C9.5 7.62 10.62 6.5 12 6.5C13.38 6.5 14.5 7.62 14.5 9C14.5 10.38 13.38 11.5 12 11.5Z"
                fill="currentColor"
              />
            </svg>
            <span>{boat.capacity} people</span>
          </div>
          <div className="boat-card-spec">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path
                d="M7 14C8.66 14 10 12.66 10 11C10 9.34 8.66 8 7 8C5.34 8 4 9.34 4 11C4 12.66 5.34 14 7 14ZM7 10C7.55 10 8 10.45 8 11C8 11.55 7.55 12 7 12C6.45 12 6 11.55 6 11C6 10.45 6.45 10 7 10ZM19 7H11V9H19V7ZM11 11H19V13H11V11ZM19 15H11V17H19V15Z"
                fill="currentColor"
              />
            </svg>
            <span>{boat.cabins} cabin{boat.cabins !== 1 ? 's' : ''}</span>
          </div>
          <div className="boat-card-spec">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path
                d="M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM19 19H5V8H19V19Z"
                fill="currentColor"
              />
            </svg>
            <span>{boat.year}</span>
          </div>
          <div className="boat-card-spec">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 2L2 7L12 12L22 7L12 2Z"
                fill="currentColor"
              />
              <path
                d="M2 17L12 22L22 17V12L12 17L2 12V17Z"
                fill="currentColor"
              />
            </svg>
            <span>{boat.length}m</span>
          </div>
        </div>

        <div className="boat-card-footer">
          <div className="boat-card-host">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 14C9.33 14 4 15.34 4 18V20H20V18C20 15.34 14.67 14 12 14Z"
                fill="currentColor"
              />
            </svg>
            <span>{boat.host?.name || 'Host'}</span>
          </div>
          <div className="boat-card-price">€{boat.price}/hour</div>
        </div>
      </div>
    </div>
  );
};

export default BoatCard;
