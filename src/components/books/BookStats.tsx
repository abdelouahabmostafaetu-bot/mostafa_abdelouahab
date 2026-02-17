'use client';

import { Book } from '@/db/schema';

interface BookStatsProps {
  stats: {
    total: number;
    completed: number;
    reading: number;
    favorites: number;
  } | null;
}

export default function BookStats({ stats }: BookStatsProps) {
  if (!stats) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-[var(--color-border)] animate-pulse"
          >
            <div className="h-8 w-16 bg-gray-200 dark:bg-gray-700 rounded mb-2" />
            <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded" />
          </div>
        ))}
      </div>
    );
  }

  const items = [
    {
      label: 'Total Books',
      value: stats.total,
      icon: '📚',
      color: 'text-primary-800 dark:text-primary-300',
    },
    {
      label: 'Completed',
      value: stats.completed,
      icon: '✅',
      color: 'text-emerald-600 dark:text-emerald-400',
    },
    {
      label: 'Reading',
      value: stats.reading,
      icon: '📖',
      color: 'text-blue-600 dark:text-blue-400',
    },
    {
      label: 'Favorites',
      value: stats.favorites,
      icon: '❤️',
      color: 'text-red-500 dark:text-red-400',
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      {items.map((item) => (
        <div
          key={item.label}
          className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-[var(--color-border)] text-center hover:shadow-md transition-shadow"
        >
          <span className="text-2xl mb-1 block">{item.icon}</span>
          <p className={`text-2xl font-bold ${item.color}`}>{item.value}</p>
          <p className="text-sm text-[var(--color-text-secondary)]">
            {item.label}
          </p>
        </div>
      ))}
    </div>
  );
}
