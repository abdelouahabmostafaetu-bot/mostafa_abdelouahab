'use client';

import { useState, useEffect, useCallback } from 'react';
import { Book } from '@/db/schema';
import BookFilters from '@/components/books/BookFilters';
import BookGrid from '@/components/books/BookGrid';
import BookModal from '@/components/books/BookModal';
import ScrollAnimation from '@/components/ui/ScrollAnimation';

export default function BooksPage() {
  const [books, setBooks] = useState<Book[]>([]);

  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);

  // Filters
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeStatus, setActiveStatus] = useState('All');
  const [activeSort, setActiveSort] = useState('recent');
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Fetch categories once
  useEffect(() => {
    fetch('/api/books?categories=true')
      .then((r) => r.json())
      .then(setCategories)
      .catch(console.error);
  }, []);

  // Fetch books when filters change
  const fetchBooks = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (activeCategory !== 'All') params.set('category', activeCategory);
      if (activeStatus !== 'All') params.set('status', activeStatus);
      if (searchQuery) params.set('search', searchQuery);
      params.set('sort', activeSort);
      params.set('page', page.toString());
      params.set('limit', '12');

      const res = await fetch(`/api/books?${params}`);
      const data = await res.json();
      setBooks(data.books);
      setTotalPages(data.totalPages);
    } catch (err) {
      console.error('Failed to fetch books:', err);
    } finally {
      setLoading(false);
    }
  }, [activeCategory, activeStatus, activeSort, searchQuery, page]);

  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

  // Debounce search
  const [searchTimer, setSearchTimer] = useState<NodeJS.Timeout | null>(null);
  function handleSearchChange(query: string) {
    setSearchQuery(query);
    setPage(1);
    if (searchTimer) clearTimeout(searchTimer);
    setSearchTimer(setTimeout(() => {}, 300));
  }

  function handleCategoryChange(cat: string) {
    setActiveCategory(cat);
    setPage(1);
  }

  function handleStatusChange(status: string) {
    setActiveStatus(status);
    setPage(1);
  }

  function handleSortChange(sort: string) {
    setActiveSort(sort);
    setPage(1);
  }

  return (
    <div className="pt-24 pb-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <ScrollAnimation>
          <div className="text-center mb-8">
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-[var(--color-text)] mb-4">
              My Mathematical Library
            </h1>
            <p className="text-lg text-[var(--color-text-secondary)] max-w-2xl mx-auto">
              A curated collection of mathematics books that have shaped my understanding.
              Each one comes with my personal review and rating.
            </p>
          </div>
        </ScrollAnimation>

        {/* Filters */}
        <ScrollAnimation delay={100}>
          <BookFilters
            categories={categories}
            activeCategory={activeCategory}
            activeStatus={activeStatus}
            activeSort={activeSort}
            searchQuery={searchQuery}
            onCategoryChange={handleCategoryChange}
            onStatusChange={handleStatusChange}
            onSortChange={handleSortChange}
            onSearchChange={handleSearchChange}
          />
        </ScrollAnimation>

        {/* Book Grid */}
        <BookGrid
          books={books}
          loading={loading}
          onBookClick={setSelectedBook}
        />

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-10">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="px-4 py-2 rounded-lg border border-[var(--color-border)] text-sm font-medium text-[var(--color-text)] hover:bg-surface-50 dark:hover:bg-gray-700 transition disabled:opacity-40"
            >
              Previous
            </button>
            <span className="text-sm text-[var(--color-text-secondary)]">
              Page {page} of {totalPages}
            </span>
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="px-4 py-2 rounded-lg border border-[var(--color-border)] text-sm font-medium text-[var(--color-text)] hover:bg-surface-50 dark:hover:bg-gray-700 transition disabled:opacity-40"
            >
              Next
            </button>
          </div>
        )}

        {/* Modal */}
        {selectedBook && (
          <BookModal
            book={selectedBook}
            onClose={() => setSelectedBook(null)}
          />
        )}
      </div>
    </div>
  );
}
