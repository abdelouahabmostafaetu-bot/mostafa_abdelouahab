'use client';

import Link from 'next/link';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  activeTag?: string;
}

export default function Pagination({ currentPage, totalPages, activeTag }: PaginationProps) {
  if (totalPages <= 1) return null;

  function buildHref(page: number) {
    const params = new URLSearchParams();
    if (activeTag) params.set('tag', activeTag);
    if (page > 1) params.set('page', String(page));
    const qs = params.toString();
    return `/blog${qs ? `?${qs}` : ''}`;
  }

  // Build page numbers with ellipsis for large ranges
  function getPageNumbers(): (number | '...')[] {
    const pages: (number | '...')[] = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
      return pages;
    }
    // Always show first page
    pages.push(1);
    if (currentPage > 3) pages.push('...');
    // Pages around current
    const start = Math.max(2, currentPage - 1);
    const end = Math.min(totalPages - 1, currentPage + 1);
    for (let i = start; i <= end; i++) pages.push(i);
    if (currentPage < totalPages - 2) pages.push('...');
    // Always show last page
    pages.push(totalPages);
    return pages;
  }

  const pageNumbers = getPageNumbers();

  return (
    <nav className="flex items-center justify-center gap-1.5 mt-12 mb-4" aria-label="Pagination">
      {/* Previous */}
      {currentPage > 1 ? (
        <Link
          href={buildHref(currentPage - 1)}
          className="px-3 py-1.5 text-sm rounded-md text-[var(--color-text-secondary)] hover:text-[var(--color-text)] hover:bg-[var(--color-hover)] transition-colors"
        >
          ← Prev
        </Link>
      ) : (
        <span className="px-3 py-1.5 text-sm rounded-md text-[var(--color-text-secondary)] opacity-40 cursor-not-allowed">
          ← Prev
        </span>
      )}

      {/* Page numbers */}
      {pageNumbers.map((p, i) =>
        p === '...' ? (
          <span key={`ellipsis-${i}`} className="px-2 py-1.5 text-sm text-[var(--color-text-secondary)]">
            …
          </span>
        ) : p === currentPage ? (
          <span
            key={p}
            className="px-3 py-1.5 text-sm font-semibold rounded-md bg-[var(--color-accent)] text-white"
          >
            {p}
          </span>
        ) : (
          <Link
            key={p}
            href={buildHref(p)}
            className="px-3 py-1.5 text-sm rounded-md text-[var(--color-text-secondary)] hover:text-[var(--color-text)] hover:bg-[var(--color-hover)] transition-colors"
          >
            {p}
          </Link>
        )
      )}

      {/* Next */}
      {currentPage < totalPages ? (
        <Link
          href={buildHref(currentPage + 1)}
          className="px-3 py-1.5 text-sm rounded-md text-[var(--color-text-secondary)] hover:text-[var(--color-text)] hover:bg-[var(--color-hover)] transition-colors"
        >
          Next →
        </Link>
      ) : (
        <span className="px-3 py-1.5 text-sm rounded-md text-[var(--color-text-secondary)] opacity-40 cursor-not-allowed">
          Next →
        </span>
      )}
    </nav>
  );
}
