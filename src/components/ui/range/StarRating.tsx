import React, { useState } from 'react';

interface StarRatingProps {
  label: string;
  id: string;
  count?: number;
  value: number;
  onChange: (value: number) => void;
  error?: string;
  disabled?: boolean;
}

const StarRating: React.FC<StarRatingProps> = ({
  label,
  id,
  count = 5,
  value,
  onChange,
  error,
  disabled = false,
}) => {
  const [hoverRating, setHoverRating] = useState(0);

  const handleStarClick = (rating: number) => {
    if (!disabled) {
      onChange(rating);
    }
  };

  const stars = Array.from({ length: count }, (_, i) => i + 1);

  return (
    <div>
      <label id={`${id}-label`} className="block text-sm font-medium text-neutral-800 dark:text-neutral-300 mb-2">
        {label}
      </label>
      <div
        className="flex items-center space-x-1"
        role="radiogroup"
        aria-labelledby={`${id}-label`}
      >
        {stars.map((starValue) => {
          const isFilled = starValue <= (hoverRating || value);
          return (
            <button
              key={starValue}
              type="button"
              role="radio"
              aria-checked={value === starValue}
              aria-label={`${starValue} star`}
              onClick={() => handleStarClick(starValue)}
              onMouseEnter={() => !disabled && setHoverRating(starValue)}
              onMouseLeave={() => !disabled && setHoverRating(0)}
              disabled={disabled}
              className={`
                text-2xl transition-colors duration-200
                ${isFilled ? 'text-warning-dark' : 'text-neutral-400 dark:text-neutral-600'}
                ${!disabled && 'hover:text-warning-dark cursor-pointer'}
                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary rounded-sm
                dark:focus:ring-offset-neutral-1000
              `}
            >
              <i className={isFilled ? 'bi bi-star-fill' : 'bi bi-star'}></i>
            </button>
          );
        })}
      </div>
      {error && (
        <p className="mt-1.5 text-xs text-danger">
          {error}
        </p>
      )}
    </div>
  );
};

export default StarRating;