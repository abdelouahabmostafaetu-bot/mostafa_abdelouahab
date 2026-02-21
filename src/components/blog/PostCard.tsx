import Link from 'next/link';
import { Calendar, Clock, ArrowRight } from 'lucide-react';

interface PostCardProps {
  slug: string;
  title: string;
  date: string;
  category: string;
  excerpt: string;
  readingTime: string;
}

export default function PostCard({
  slug,
  title,
  date,
  category,
  excerpt,
  readingTime,
}: PostCardProps) {
  return (
    <Link href={`/blog/${slug}`} className="group block">
      <article className="p-5 rounded-lg border border-[var(--color-border)] hover:border-[var(--color-accent)] transition-colors h-full">
        {/* Meta */}
        <div className="flex items-center gap-3 mb-3 text-xs text-[var(--color-text-secondary)]">
          <span className="px-2 py-0.5 rounded bg-[var(--color-surface)] font-medium">
            {category}
          </span>
          <span className="flex items-center gap-1">
            <Calendar size={12} />
            {date}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-lg font-semibold text-[var(--color-text)] mb-2 group-hover:text-[var(--color-accent)] transition-colors leading-snug">
          {title}
        </h3>

        {/* Excerpt */}
        <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed mb-4 line-clamp-3">
          {excerpt}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between text-xs text-[var(--color-text-secondary)]">
          <span className="flex items-center gap-1">
            <Clock size={12} />
            {readingTime}
          </span>
          <span className="flex items-center gap-1 text-[var(--color-accent)] font-medium">
            Read <ArrowRight size={12} />
          </span>
        </div>
      </article>
    </Link>
  );
}
