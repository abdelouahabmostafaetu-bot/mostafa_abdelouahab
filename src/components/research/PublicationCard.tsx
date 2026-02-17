'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp, Download, ExternalLink } from 'lucide-react';
import Card from '@/components/ui/Card';

interface Publication {
  title: string;
  authors: string[];
  venue: string;
  year: number;
  abstract: string;
  pdf: string;
  arxiv: string;
  tags: string[];
}

interface PublicationCardProps {
  publication: Publication;
}

export default function PublicationCard({ publication }: PublicationCardProps) {
  const [showAbstract, setShowAbstract] = useState(false);

  return (
    <Card>
      <div className="space-y-3">
        {/* Title */}
        <h3 className="font-heading text-lg font-bold text-[var(--color-text)] leading-tight">
          {publication.title}
        </h3>

        {/* Authors */}
        <p className="text-sm text-[var(--color-text-secondary)]">
          {publication.authors.join(', ')}
        </p>

        {/* Venue & Year */}
        <div className="flex items-center gap-3 text-sm">
          <span className="text-primary-800 dark:text-primary-300 font-medium">
            {publication.venue}
          </span>
          <span className="px-2 py-0.5 rounded-full bg-accent-100 dark:bg-accent-900 text-accent-700 dark:text-accent-300 text-xs font-semibold">
            {publication.year}
          </span>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {publication.tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 text-xs rounded-full bg-surface-50 dark:bg-gray-700 text-[var(--color-text-secondary)]"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Abstract Toggle */}
        {publication.abstract && (
          <div>
            <button
              onClick={() => setShowAbstract(!showAbstract)}
              className="flex items-center gap-1 text-sm text-primary-800 dark:text-primary-300 hover:text-accent-500 transition-colors font-medium"
            >
              {showAbstract ? (
                <>
                  Hide Abstract <ChevronUp size={14} />
                </>
              ) : (
                <>
                  Show Abstract <ChevronDown size={14} />
                </>
              )}
            </button>
            {showAbstract && (
              <p className="mt-2 text-sm text-[var(--color-text-secondary)] leading-relaxed bg-surface-50 dark:bg-gray-700/50 p-4 rounded-lg">
                {publication.abstract}
              </p>
            )}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex items-center gap-3 pt-2">
          {publication.pdf && (
            <a
              href={publication.pdf}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-primary-800 dark:text-primary-300 hover:text-accent-500 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Download size={14} />
              PDF
            </a>
          )}
          {publication.arxiv && (
            <a
              href={publication.arxiv}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-primary-800 dark:text-primary-300 hover:text-accent-500 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              <ExternalLink size={14} />
              arXiv
            </a>
          )}
        </div>
      </div>
    </Card>
  );
}
