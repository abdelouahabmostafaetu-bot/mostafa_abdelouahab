'use client';

import { useEffect, useState } from 'react';
import { clsx } from 'clsx';

interface Heading {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  headings: Heading[];
}

export default function TableOfContents({ headings }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-80px 0px -80% 0px' }
    );

    headings.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <nav className="sticky top-24">
      <h4 className="text-sm font-semibold text-[var(--color-text)] mb-3 uppercase tracking-wider">
        Table of Contents
      </h4>
      <ul className="space-y-1 border-l-2 border-[var(--color-border)]">
        {headings.map((heading) => (
          <li key={heading.id}>
            <a
              href={`#${heading.id}`}
              className={clsx(
                'block text-sm py-1 transition-all duration-200 border-l-2 -ml-[2px]',
                heading.level === 2 ? 'pl-4' : 'pl-8',
                activeId === heading.id
                  ? 'text-primary-800 dark:text-primary-300 border-accent-500 font-medium'
                  : 'text-[var(--color-text-secondary)] border-transparent hover:text-primary-800 dark:hover:text-primary-300 hover:border-primary-300'
              )}
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
