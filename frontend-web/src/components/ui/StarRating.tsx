import React from 'react';
import './StarRating.css';

interface StarRatingProps {
  rating: number;
  maxRating?: number;
  size?: 'small' | 'medium' | 'large';
  showValue?: boolean;
  interactive?: boolean;
  onRatingChange?: (rating: number) => void;
}

const StarRating: React.FC<StarRatingProps> = ({
  rating,
  maxRating = 5,
  size = 'medium',
  showValue = false,
  interactive = false,
  onRatingChange,
}) => {
  const [hoverRating, setHoverRating] = React.useState<number | null>(null);

  const handleClick = (value: number) => {
    if (interactive && onRatingChange) {
      onRatingChange(value);
    }
  };

  const handleMouseEnter = (value: number) => {
    if (interactive) {
      setHoverRating(value);
    }
  };

  const handleMouseLeave = () => {
    if (interactive) {
      setHoverRating(null);
    }
  };

  const displayRating = hoverRating !== null ? hoverRating : rating;

  return (
    <div className={`star-rating star-rating-${size}`}>
      <div className="star-rating-stars">
        {Array.from({ length: maxRating }, (_, i) => {
          const value = i + 1;
          const isFilled = value <= displayRating;
          return (
            <span
              key={value}
              className={`star ${isFilled ? 'star-filled' : 'star-empty'} ${
                interactive ? 'star-interactive' : ''
              }`}
              onClick={() => handleClick(value)}
              onMouseEnter={() => handleMouseEnter(value)}
              onMouseLeave={handleMouseLeave}
            >
              ★
            </span>
          );
        })}
      </div>
      {showValue && (
        <span className="star-rating-value">{rating.toFixed(1)}</span>
      )}
    </div>
  );
};

export default StarRating;

