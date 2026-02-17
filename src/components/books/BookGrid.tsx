'use client';

import { Book } from '@/db/schema';
import BookCard from './BookCard';

interface BookGridProps {
  books: Book[];
  loading: boolean;
  onBookClick: (book: Book) => void;
}

function BookSkeleton() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-[var(--color-border)] overflow-hidden animate-pulse">
      <div className="aspect-[3/4] bg-gray-200 dark:bg-gray-700" />
      <div className="p-4 space-y-2">
        <div className="h-3 w-16 bg-gray-200 dark:bg-gray-700 rounded-full" />
        <div className="h-4 w-full bg-gray-200 dark:bg-gray-700 rounded" />
        <div className="h-3 w-24 bg-gray-200 dark:bg-gray-700 rounded" />
        <div className="h-3 w-20 bg-gray-200 dark:bg-gray-700 rounded" />
      </div>
    </div>
  );
}

export default function BookGrid({ books, loading, onBookClick }: BookGridProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <BookSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (books.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="text-5xl mb-4">📚</div>
        <h3 className="font-heading text-xl font-bold text-[var(--color-text)] mb-2">
          No books found
        </h3>
        <p className="text-[var(--color-text-secondary)]">
          Try adjusting your filters or search query.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {books.map((book) => (
        <BookCard key={book.id} book={book} onClick={() => onBookClick(book)} />
      ))}
    </div>
  );
}
