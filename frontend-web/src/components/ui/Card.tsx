import React from 'react';
import './Card.css';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  hoverable?: boolean;
}

const Card: React.FC<CardProps> = ({
  children,
  className = '',
  onClick,
  hoverable = false,
}) => {
  const baseClass = 'card';
  const hoverClass = hoverable ? 'card-hoverable' : '';
  const clickableClass = onClick ? 'card-clickable' : '';

  return (
    <div
      className={`${baseClass} ${hoverClass} ${clickableClass} ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default Card;

