'use client';

import { X, ExternalLink, FileText, Heart } from 'lucide-react';
import { Book } from '@/db/schema';
import StarRating from './StarRating';

interface BookModalProps {
  book: Book;
  onClose: () => void;
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

export default function BookModal({ book, onClose }: BookModalProps) {
  const statusInfo = statusLabels[book.status] || statusLabels['want-to-read'];
  const catColor = categoryColors[book.category] || categoryColors['Other'];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white dark:bg-gray-800 rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-[var(--color-border)]">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition z-10"
        >
          <X size={18} className="text-[var(--color-text)]" />
        </button>

        <div className="p-6">
          {/* Cover + Basic Info */}
          <div className="flex gap-5 mb-5">
            <div className="flex-shrink-0 w-32 h-44 rounded-lg overflow-hidden bg-gradient-to-br from-primary-200 to-primary-400 dark:from-primary-800 dark:to-primary-900 shadow-md">
              {book.coverUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={book.coverUrl}
                  alt={book.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center p-2">
                  <div className="text-center bg-white/90 dark:bg-gray-800/90 rounded-lg p-3">
                    <p className="font-heading text-xs font-bold text-primary-800 dark:text-primary-200 leading-tight">
                      {book.title}
                    </p>
                  </div>
                </div>
              )}
            </div>

            <div className="flex-grow min-w-0">
              <h2 className="font-heading text-xl font-bold text-[var(--color-text)] mb-1 leading-tight">
                {book.title}
              </h2>
              <p className="text-[var(--color-text-secondary)] mb-3">
                {book.author}
              </p>

              <div className="flex flex-wrap gap-2 mb-3">
                <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${catColor}`}>
                  {book.category}
                </span>
                <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${statusInfo.color}`}>
                  {statusInfo.label}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <StarRating rating={book.rating || 0} size="md" />
                {book.isFavorite && (
                  <Heart size={16} className="text-red-500 fill-red-500" />
                )}
              </div>
            </div>
          </div>

          {/* Review */}
          {book.myReview && (
            <div className="mb-5">
              <h3 className="font-heading text-sm font-bold text-[var(--color-text)] mb-2 uppercase tracking-wide">
                My Review
              </h3>
              <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed bg-surface-50 dark:bg-gray-700/50 rounded-lg p-4 border border-[var(--color-border)]">
                &ldquo;{book.myReview}&rdquo;
              </p>
            </div>
          )}

          {/* ISBN */}
          {book.isbn && (
            <p className="text-xs text-[var(--color-text-secondary)] mb-4">
              ISBN: {book.isbn}
            </p>
          )}

          {/* Links */}
          <div className="flex flex-wrap gap-3">
            {book.pdfUrl && (
              <a
                href={book.pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-primary-800 dark:text-primary-300 bg-primary-50 dark:bg-primary-900/50 rounded-lg hover:bg-primary-100 dark:hover:bg-primary-900 transition"
              >
                <FileText size={14} />
                View PDF
              </a>
            )}
            {book.externalLink && (
              <a
                href={book.externalLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-accent-700 dark:text-accent-300 bg-accent-50 dark:bg-accent-900/50 rounded-lg hover:bg-accent-100 dark:hover:bg-accent-900 transition"
              >
                <ExternalLink size={14} />
                External Link
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
