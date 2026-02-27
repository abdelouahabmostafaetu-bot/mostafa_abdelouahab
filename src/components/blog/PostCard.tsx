import Link from 'next/link';
import { Clock } from 'lucide-react';
import { TagList } from './Tag';

interface PostCardProps {
  slug: string;
  title: string;
  date: string;
  category: string;
  excerpt: string;
  readingTime: string;
  tags?: string[];
  isLast?: boolean;
}

export default function PostCard({
  slug,
  title,
  date,
  category,
  excerpt,
  readingTime,
  tags,
  isLast = false,
}: PostCardProps) {
  return (
    <article
      className={`py-7 ${
        !isLast ? 'border-b border-[var(--color-border)]/60' : ''
      }`}
    >
      <Link href={`/blog/${slug}`} className="group block">
        {/* Date & Category */}
        <div className="flex items-center gap-2.5 text-xs text-[var(--color-text-tertiary)] mb-2.5">
          <time>{date}</time>
          <span className="w-1 h-1 rounded-full bg-[var(--color-border)]" />
          <span>{category}</span>
          <span className="w-1 h-1 rounded-full bg-[var(--color-border)]" />
          <span className="inline-flex items-center gap-1">
            <Clock size={11} />
            {readingTime}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-lg font-semibold text-[var(--color-text)] mb-2 group-hover:text-[var(--color-accent)] transition-colors duration-200 leading-snug">
          {title}
        </h3>

        {/* Excerpt */}
        <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed line-clamp-2">
          {excerpt}
        </p>
      </Link>

      {/* Tags */}
      {tags && tags.length > 0 && (
        <div className="mt-3">
          <TagList tags={tags} size="sm" />
        </div>
      )}
    </article>
  );
}
