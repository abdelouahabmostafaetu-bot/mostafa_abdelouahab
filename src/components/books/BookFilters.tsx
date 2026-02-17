'use client';

import { Search, SlidersHorizontal } from 'lucide-react';
import { useState } from 'react';

interface BookFiltersProps {
  categories: string[];
  activeCategory: string;
  activeStatus: string;
  activeSort: string;
  searchQuery: string;
  onCategoryChange: (cat: string) => void;
  onStatusChange: (status: string) => void;
  onSortChange: (sort: string) => void;
  onSearchChange: (query: string) => void;
}

const statusOptions = ['All', 'Completed', 'Reading', 'Want to Read'];
const sortOptions = [
  { value: 'recent', label: 'Recently Added' },
  { value: 'rating', label: 'Rating (High to Low)' },
  { value: 'title', label: 'Title (A-Z)' },
  { value: 'author', label: 'Author (A-Z)' },
];

export default function BookFilters({
  categories,
  activeCategory,
  activeStatus,
  activeSort,
  searchQuery,
  onCategoryChange,
  onStatusChange,
  onSortChange,
  onSearchChange,
}: BookFiltersProps) {
  const [showFilters, setShowFilters] = useState(false);

  return (
    <div className="mb-8 space-y-4">
      {/* Search Bar */}
      <div className="relative max-w-md mx-auto">
        <Search
          size={18}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-secondary)]"
        />
        <input
          type="text"
          placeholder="Search by title or author..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[var(--color-border)] bg-white dark:bg-gray-800 text-[var(--color-text)] placeholder:text-[var(--color-text-secondary)] focus:outline-none focus:ring-2 focus:ring-primary-800/30 dark:focus:ring-primary-300/30 transition"
        />
      </div>

      {/* Toggle Filters Button (mobile) */}
      <div className="flex justify-center md:hidden">
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2 text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text)] transition"
        >
          <SlidersHorizontal size={16} />
          {showFilters ? 'Hide Filters' : 'Show Filters'}
        </button>
      </div>

      {/* Category Tabs */}
      <div className={`${showFilters ? 'block' : 'hidden'} md:block`}>
        <div className="flex flex-wrap justify-center gap-2 mb-4">
          {['All', ...categories].map((cat) => (
            <button
              key={cat}
              onClick={() => onCategoryChange(cat)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                activeCategory === cat
                  ? 'bg-primary-800 dark:bg-primary-600 text-white shadow-md'
                  : 'bg-white dark:bg-gray-800 text-[var(--color-text-secondary)] border border-[var(--color-border)] hover:border-primary-800 dark:hover:border-primary-400'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Status & Sort Row */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          {/* Status Filter */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-[var(--color-text-secondary)] font-medium uppercase tracking-wide">
              Status:
            </span>
            <div className="flex gap-1">
              {statusOptions.map((st) => (
                <button
                  key={st}
                  onClick={() => onStatusChange(st)}
                  className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                    activeStatus === st
                      ? 'bg-accent-500 text-white'
                      : 'bg-surface-50 dark:bg-gray-700 text-[var(--color-text-secondary)] hover:bg-surface-100 dark:hover:bg-gray-600'
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>
          </div>

          {/* Sort */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-[var(--color-text-secondary)] font-medium uppercase tracking-wide">
              Sort:
            </span>
            <select
              value={activeSort}
              onChange={(e) => onSortChange(e.target.value)}
              className="px-3 py-1 rounded-lg text-xs font-medium bg-white dark:bg-gray-800 border border-[var(--color-border)] text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-primary-800/30"
            >
              {sortOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
