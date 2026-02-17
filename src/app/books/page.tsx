'use client';

import { useState } from 'react';
import type { Metadata } from 'next';
import BookCard from '@/components/books/BookCard';
import FilterTabs from '@/components/ui/FilterTabs';
import ScrollAnimation from '@/components/ui/ScrollAnimation';
import books from '@/content/books.json';

const categories = ['All', ...Array.from(new Set(books.map((b) => b.category)))];

export default function BooksPage() {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredBooks =
    activeCategory === 'All'
      ? books
      : books.filter((b) => b.category === activeCategory);

  return (
    <div className="pt-24 pb-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <ScrollAnimation>
          <div className="text-center mb-8">
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-[var(--color-text)] mb-4">
              Recommended Books
            </h1>
            <p className="text-lg text-[var(--color-text-secondary)] max-w-2xl mx-auto">
              A curated collection of mathematics books that have shaped my understanding.
              Each one comes with my personal review and rating.
            </p>
          </div>
        </ScrollAnimation>

        {/* Filter */}
        <ScrollAnimation delay={100}>
          <div className="flex justify-center mb-10">
            <FilterTabs
              categories={categories}
              activeCategory={activeCategory}
              onSelect={setActiveCategory}
            />
          </div>
        </ScrollAnimation>

        {/* Books Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredBooks.map((book, index) => (
            <ScrollAnimation key={book.title} delay={index * 50}>
              <BookCard book={book} />
            </ScrollAnimation>
          ))}
        </div>

        {filteredBooks.length === 0 && (
          <div className="text-center py-12 text-[var(--color-text-secondary)]">
            No books in this category yet.
          </div>
        )}
      </div>
    </div>
  );
}
