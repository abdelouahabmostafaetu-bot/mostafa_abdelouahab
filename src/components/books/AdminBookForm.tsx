'use client';

import { useState, useEffect } from 'react';
import { Book } from '@/db/schema';
import StarRating from './StarRating';

interface AdminBookFormProps {
  book?: Book | null;
  password: string;
  onSaved: () => void;
  onCancel: () => void;
}

const categories = [
  'Analysis',
  'Topology',
  'Algebra',
  'Dynamical Systems',
  'General Mathematics',
  'Physics',
  'Other',
];

const statuses = [
  { value: 'want-to-read', label: 'Want to Read' },
  { value: 'reading', label: 'Reading' },
  { value: 'completed', label: 'Completed' },
];

export default function AdminBookForm({
  book,
  password,
  onSaved,
  onCancel,
}: AdminBookFormProps) {
  const isEditing = !!book;

  const [title, setTitle] = useState(book?.title || '');
  const [author, setAuthor] = useState(book?.author || '');
  const [isbn, setIsbn] = useState(book?.isbn || '');
  const [coverUrl, setCoverUrl] = useState(book?.coverUrl || '');
  const [category, setCategory] = useState(book?.category || 'Analysis');
  const [rating, setRating] = useState(book?.rating || 3);
  const [myReview, setMyReview] = useState(book?.myReview || '');
  const [status, setStatus] = useState(book?.status || 'want-to-read');
  const [isFavorite, setIsFavorite] = useState(book?.isFavorite || false);
  const [pdfUrl, setPdfUrl] = useState(book?.pdfUrl || '');
  const [externalLink, setExternalLink] = useState(book?.externalLink || '');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [coverPreview, setCoverPreview] = useState(book?.coverUrl || '');

  // Auto-fetch cover when ISBN changes
  useEffect(() => {
    if (isbn && isbn.length >= 10) {
      const url = `https://covers.openlibrary.org/b/isbn/${isbn}-L.jpg`;
      setCoverPreview(url);
      if (!coverUrl) {
        setCoverUrl(url);
      }
    }
  }, [isbn]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError('');

    const body = {
      title,
      author,
      isbn: isbn || null,
      coverUrl: coverUrl || null,
      category,
      rating,
      myReview: myReview || null,
      status,
      isFavorite,
      pdfUrl: pdfUrl || null,
      externalLink: externalLink || null,
    };

    try {
      const url = isEditing ? `/api/books/${book.id}` : '/api/books';
      const method = isEditing ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'x-admin-password': password,
        },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to save book');
      }

      onSaved();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  const inputClass =
    'w-full px-3 py-2 rounded-lg border border-[var(--color-border)] bg-white dark:bg-gray-800 text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-primary-800/30 dark:focus:ring-primary-300/30 text-sm';
  const labelClass =
    'block text-sm font-medium text-[var(--color-text)] mb-1';

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-[var(--color-border)] p-6 mb-6">
      <h2 className="font-heading text-xl font-bold text-[var(--color-text)] mb-4">
        {isEditing ? `Edit: ${book.title}` : 'Add New Book'}
      </h2>

      {error && (
        <div className="bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 p-3 rounded-lg mb-4 text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title — The book's full title */}
        <div>
          <label className={labelClass}>Title *</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            placeholder="e.g., Principles of Mathematical Analysis"
            className={inputClass}
          />
        </div>

        {/* Author — The author(s) of the book */}
        <div>
          <label className={labelClass}>Author *</label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
            placeholder="e.g., Walter Rudin"
            className={inputClass}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* ISBN — Type the ISBN to auto-load the cover image */}
          <div>
            <label className={labelClass}>
              ISBN <span className="text-xs text-[var(--color-text-secondary)]">(auto-loads cover)</span>
            </label>
            <input
              type="text"
              value={isbn}
              onChange={(e) => setIsbn(e.target.value)}
              placeholder="e.g., 007054235X"
              className={inputClass}
            />
          </div>

          {/* Category — Pick the math subject area */}
          <div>
            <label className={labelClass}>Category *</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className={inputClass}
            >
              {categories.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Cover URL — Auto-filled from ISBN, or paste a custom image URL */}
        <div>
          <label className={labelClass}>
            Cover Image URL <span className="text-xs text-[var(--color-text-secondary)]">(auto-filled from ISBN)</span>
          </label>
          <input
            type="text"
            value={coverUrl}
            onChange={(e) => {
              setCoverUrl(e.target.value);
              setCoverPreview(e.target.value);
            }}
            placeholder="https://covers.openlibrary.org/b/isbn/..."
            className={inputClass}
          />
          {/* Cover Preview */}
          {coverPreview && (
            <div className="mt-2 flex items-center gap-3">
              <div className="w-16 h-20 rounded border border-[var(--color-border)] overflow-hidden bg-gray-100 dark:bg-gray-700">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={coverPreview}
                  alt="Cover preview"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
              </div>
              <span className="text-xs text-[var(--color-text-secondary)]">Cover preview</span>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Status — Your reading status */}
          <div>
            <label className={labelClass}>Reading Status *</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className={inputClass}
            >
              {statuses.map((s) => (
                <option key={s.value} value={s.value}>{s.label}</option>
              ))}
            </select>
          </div>

          {/* Rating — Your personal rating (1-5 stars) */}
          <div>
            <label className={labelClass}>Rating</label>
            <StarRating rating={rating} size="lg" interactive onChange={setRating} />
          </div>
        </div>

        {/* Favorite — Mark this book as one of your favorites */}
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="favorite"
            checked={isFavorite}
            onChange={(e) => setIsFavorite(e.target.checked)}
            className="rounded border-[var(--color-border)] text-accent-500 focus:ring-accent-500"
          />
          <label htmlFor="favorite" className="text-sm text-[var(--color-text)]">
            ❤️ Mark as Favorite
          </label>
        </div>

        {/* Review — Your personal short review or comment about the book */}
        <div>
          <label className={labelClass}>My Review / Comment</label>
          <textarea
            value={myReview}
            onChange={(e) => setMyReview(e.target.value)}
            rows={3}
            placeholder="Write a short review or comment about this book..."
            className={inputClass}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* PDF URL — Link to a legal free PDF (optional) */}
          <div>
            <label className={labelClass}>
              PDF URL <span className="text-xs text-[var(--color-text-secondary)]">(optional)</span>
            </label>
            <input
              type="text"
              value={pdfUrl}
              onChange={(e) => setPdfUrl(e.target.value)}
              placeholder="https://..."
              className={inputClass}
            />
          </div>

          {/* External Link — Link to publisher, Amazon, etc. (optional) */}
          <div>
            <label className={labelClass}>
              External Link <span className="text-xs text-[var(--color-text-secondary)]">(optional)</span>
            </label>
            <input
              type="text"
              value={externalLink}
              onChange={(e) => setExternalLink(e.target.value)}
              placeholder="https://..."
              className={inputClass}
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-3 pt-2">
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-2.5 bg-primary-800 dark:bg-primary-600 text-white rounded-lg font-medium text-sm hover:bg-primary-900 dark:hover:bg-primary-700 transition disabled:opacity-50"
          >
            {saving ? 'Saving...' : isEditing ? 'Update Book' : 'Add Book'}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-2.5 border border-[var(--color-border)] text-[var(--color-text)] rounded-lg font-medium text-sm hover:bg-surface-50 dark:hover:bg-gray-700 transition"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
