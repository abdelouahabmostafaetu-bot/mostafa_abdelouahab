'use client';

import { Heart } from 'lucide-react';
import { Book } from '@/db/schema';
import StarRating from './StarRating';

interface BookCardProps {
  book: Book;
  onClick: () => void;
}

const categoryColors: Record<string, string> = {
  Analysis: 'bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300',
  Topology: 'bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300',
  Algebra: 'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300',
  'Dynamical Systems': 'bg-orange-100 dark:bg-orange-900/40 text-orange-700 dark:text-orange-300',
  'General Mathematics': 'bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300',
  Physics: 'bg-cyan-100 dark:bg-cyan-900/40 text-cyan-700 dark:text-cyan-300',
  Other: 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300',
};

const statusLabels: Record<string, { label: string; color: string }> = {
  completed: { label: 'Completed', color: 'bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300' },
  reading: { label: 'Reading', color: 'bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300' },
  'want-to-read': { label: 'Want to Read', color: 'bg-orange-100 dark:bg-orange-900/40 text-orange-700 dark:text-orange-300' },
};

export default function BookCard({ book, onClick }: BookCardProps) {
  const statusInfo = statusLabels[book.status] || statusLabels['want-to-read'];
  const catColor = categoryColors[book.category] || categoryColors['Other'];

  return (
    <div
      onClick={onClick}
      className="group bg-white dark:bg-gray-800 rounded-xl border border-[var(--color-border)] overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer"
    >
      {/* Cover Image */}
      <div className="aspect-[3/4] bg-gradient-to-br from-primary-200 to-primary-400 dark:from-primary-800 dark:to-primary-900 relative overflow-hidden">
        {book.coverUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={book.coverUrl}
            alt={book.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = 'none';
            }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center p-4">
            <div className="text-center bg-white/90 dark:bg-gray-800/90 rounded-lg p-4 shadow-lg max-w-[140px]">
              <p className="font-heading text-sm font-bold text-primary-800 dark:text-primary-200 leading-tight">
                {book.title}
              </p>
              <p className="text-xs text-[var(--color-text-secondary)] mt-1">
                {book.author}
              </p>
            </div>
          </div>
        )}

        {/* Favorite Heart */}
        {book.isFavorite && (
          <div className="absolute top-2 right-2 p-1.5 bg-white/90 dark:bg-gray-800/90 rounded-full shadow">
            <Heart size={14} className="text-red-500 fill-red-500" />
          </div>
        )}

        {/* Status Badge */}
        <div className="absolute bottom-2 left-2">
          <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${statusInfo.color} backdrop-blur-sm`}>
            {statusInfo.label}
          </span>
        </div>
      </div>

      {/* Info */}
      <div className="p-4">
        <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-medium mb-2 ${catColor}`}>
          {book.category}
        </span>
        <h3 className="font-heading text-sm font-bold text-[var(--color-text)] leading-tight mb-1 line-clamp-2">
          {book.title}
        </h3>
        <p className="text-xs text-[var(--color-text-secondary)] mb-2 line-clamp-1">
          {book.author}
        </p>
        <StarRating rating={book.rating || 0} size="sm" />
      </div>
    </div>
  );
}
