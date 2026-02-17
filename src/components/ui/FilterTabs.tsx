'use client';

import { useState } from 'react';
import { clsx } from 'clsx';

interface FilterTabsProps {
  categories: string[];
  activeCategory: string;
  onSelect: (category: string) => void;
}

export default function FilterTabs({
  categories,
  activeCategory,
  onSelect,
}: FilterTabsProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onSelect(category)}
          className={clsx(
            'px-4 py-2 rounded-full text-sm font-medium transition-all duration-200',
            activeCategory === category
              ? 'bg-primary-800 text-white dark:bg-primary-600'
              : 'bg-surface-50 text-[var(--color-text-secondary)] hover:bg-surface-100 dark:bg-gray-800 dark:hover:bg-gray-700'
          )}
        >
          {category}
        </button>
      ))}
    </div>
  );
}
