'use client';

interface StarRatingProps {
  rating: number;
  size?: 'sm' | 'md' | 'lg';
  interactive?: boolean;
  onChange?: (rating: number) => void;
}

export default function StarRating({
  rating,
  size = 'sm',
  interactive = false,
  onChange,
}: StarRatingProps) {
  const sizeMap = { sm: 'text-sm', md: 'text-base', lg: 'text-lg' };

  return (
    <div className={`flex items-center gap-0.5 ${sizeMap[size]}`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <span
          key={i}
          className={`${
            i < rating
              ? 'text-accent-500'
              : 'text-gray-300 dark:text-gray-600'
          } ${interactive ? 'cursor-pointer hover:scale-110 transition-transform' : ''}`}
          onClick={() => interactive && onChange?.(i + 1)}
          role={interactive ? 'button' : undefined}
          aria-label={interactive ? `Rate ${i + 1} stars` : undefined}
        >
          ★
        </span>
      ))}
    </div>
  );
}
