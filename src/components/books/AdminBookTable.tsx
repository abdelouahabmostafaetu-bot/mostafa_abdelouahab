'use client';

import { Book } from '@/db/schema';
import { Pencil, Trash2, Heart, Star } from 'lucide-react';

interface AdminBookTableProps {
  books: Book[];
  onEdit: (book: Book) => void;
  onDelete: (book: Book) => void;
  onToggleFavorite: (book: Book) => void;
}

const statusLabels: Record<string, { label: string; color: string }> = {
  completed: { label: 'Completed', color: 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30' },
  reading: { label: 'Reading', color: 'text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/30' },
  'want-to-read': { label: 'Want to Read', color: 'text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-900/30' },
};

export default function AdminBookTable({
  books,
  onEdit,
  onDelete,
  onToggleFavorite,
}: AdminBookTableProps) {
  if (books.length === 0) {
    return (
      <div className="text-center py-12 text-[var(--color-text-secondary)]">
        No books yet. Click &quot;Add New Book&quot; to get started!
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-[var(--color-border)]">
            <th className="text-left py-3 px-2 text-[var(--color-text-secondary)] font-medium">Cover</th>
            <th className="text-left py-3 px-2 text-[var(--color-text-secondary)] font-medium">Title</th>
            <th className="text-left py-3 px-2 text-[var(--color-text-secondary)] font-medium hidden md:table-cell">Author</th>
            <th className="text-left py-3 px-2 text-[var(--color-text-secondary)] font-medium hidden lg:table-cell">Category</th>
            <th className="text-left py-3 px-2 text-[var(--color-text-secondary)] font-medium hidden md:table-cell">Status</th>
            <th className="text-left py-3 px-2 text-[var(--color-text-secondary)] font-medium hidden md:table-cell">Rating</th>
            <th className="text-right py-3 px-2 text-[var(--color-text-secondary)] font-medium">Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => {
            const statusInfo = statusLabels[book.status] || statusLabels['want-to-read'];
            return (
              <tr
                key={book.id}
                className="border-b border-[var(--color-border)] hover:bg-surface-50 dark:hover:bg-gray-700/50 transition"
              >
                {/* Cover */}
                <td className="py-2 px-2">
                  <div className="w-10 h-14 rounded overflow-hidden bg-gray-100 dark:bg-gray-700 flex-shrink-0">
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
                      <div className="w-full h-full bg-primary-100 dark:bg-primary-800 flex items-center justify-center text-[8px] text-primary-800 dark:text-primary-200 font-bold p-0.5 text-center leading-tight">
                        {book.title.substring(0, 20)}
                      </div>
                    )}
                  </div>
                </td>

                {/* Title */}
                <td className="py-2 px-2">
                  <div className="flex items-center gap-1">
                    <span className="font-medium text-[var(--color-text)] line-clamp-1">{book.title}</span>
                    {book.isFavorite && (
                      <Heart size={12} className="text-red-500 fill-red-500 flex-shrink-0" />
                    )}
                  </div>
                  <span className="text-xs text-[var(--color-text-secondary)] md:hidden">{book.author}</span>
                </td>

                {/* Author */}
                <td className="py-2 px-2 text-[var(--color-text-secondary)] hidden md:table-cell">
                  {book.author}
                </td>

                {/* Category */}
                <td className="py-2 px-2 hidden lg:table-cell">
                  <span className="text-xs text-[var(--color-text-secondary)]">{book.category}</span>
                </td>

                {/* Status */}
                <td className="py-2 px-2 hidden md:table-cell">
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${statusInfo.color}`}>
                    {statusInfo.label}
                  </span>
                </td>

                {/* Rating */}
                <td className="py-2 px-2 hidden md:table-cell">
                  <div className="flex items-center gap-0.5 text-xs">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <span
                        key={i}
                        className={i < (book.rating || 0) ? 'text-accent-500' : 'text-gray-300 dark:text-gray-600'}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                </td>

                {/* Actions */}
                <td className="py-2 px-2 text-right">
                  <div className="flex items-center justify-end gap-1">
                    <button
                      onClick={() => onToggleFavorite(book)}
                      className={`p-1.5 rounded-lg transition ${
                        book.isFavorite
                          ? 'text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30'
                          : 'text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                      }`}
                      title={book.isFavorite ? 'Remove from favorites' : 'Add to favorites'}
                    >
                      <Heart size={14} className={book.isFavorite ? 'fill-red-500' : ''} />
                    </button>
                    <button
                      onClick={() => onEdit(book)}
                      className="p-1.5 rounded-lg text-primary-800 dark:text-primary-300 hover:bg-primary-50 dark:hover:bg-primary-900/30 transition"
                      title="Edit book"
                    >
                      <Pencil size={14} />
                    </button>
                    <button
                      onClick={() => onDelete(book)}
                      className="p-1.5 rounded-lg text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 transition"
                      title="Delete book"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
