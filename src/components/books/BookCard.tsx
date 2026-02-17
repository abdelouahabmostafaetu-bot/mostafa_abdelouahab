import { Star } from 'lucide-react';
import Card from '@/components/ui/Card';

interface Book {
  title: string;
  author: string;
  cover: string;
  category: string;
  rating: number;
  review: string;
}

interface BookCardProps {
  book: Book;
}

export default function BookCard({ book }: BookCardProps) {
  return (
    <Card padding="none" className="overflow-hidden">
      {/* Book Cover */}
      <div className="aspect-[3/4] bg-gradient-to-br from-primary-200 to-primary-400 dark:from-primary-800 dark:to-primary-900 flex items-center justify-center p-4">
        {/* Placeholder cover - replace with actual book cover images */}
        <div className="text-center">
          <div className="bg-white/90 dark:bg-gray-800/90 rounded-lg p-4 shadow-lg max-w-[140px]">
            <p className="font-heading text-sm font-bold text-primary-800 dark:text-primary-200 leading-tight">
              {book.title}
            </p>
            <p className="text-xs text-[var(--color-text-secondary)] mt-1">{book.author}</p>
          </div>
        </div>
      </div>

      {/* Book Info */}
      <div className="p-4">
        <span className="inline-block px-2 py-0.5 text-xs rounded-full bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-300 mb-2">
          {book.category}
        </span>
        <h3 className="font-heading text-base font-bold text-[var(--color-text)] leading-tight mb-1">
          {book.title}
        </h3>
        <p className="text-sm text-[var(--color-text-secondary)] mb-2">{book.author}</p>

        {/* Rating */}
        <div className="flex items-center gap-0.5 mb-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              size={14}
              className={
                i < book.rating
                  ? 'text-accent-500 fill-accent-500'
                  : 'text-gray-300 dark:text-gray-600'
              }
            />
          ))}
        </div>

        {/* Review */}
        <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed line-clamp-3">
          {book.review}
        </p>
      </div>
    </Card>
  );
}
