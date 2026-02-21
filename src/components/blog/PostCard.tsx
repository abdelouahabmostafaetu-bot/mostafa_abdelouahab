import Link from 'next/link';
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
    <article className={`py-6 ${!isLast ? 'border-b border-[var(--color-border)]' : ''}`}>
      <Link href={`/blog/${slug}`} className="group block">
        {/* Date & Category */}
        <div className="flex items-center gap-2 text-xs text-[var(--color-text-secondary)] mb-2">
          <time>{date}</time>
          <span className="text-[var(--color-border)]">/</span>
          <span>{category}</span>
          <span className="text-[var(--color-border)]">/</span>
          <span>{readingTime}</span>
        </div>

        {/* Title */}
        <h3 className="text-xl font-semibold text-[var(--color-text)] mb-1.5 group-hover:text-[var(--color-accent)] transition-colors leading-snug">
          {title}
        </h3>

        {/* Excerpt */}
        <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed line-clamp-2">
          {excerpt}
        </p>
      </Link>

      {/* Tags */}
      {tags && tags.length > 0 && (
        <div className="mt-2.5">
          <TagList tags={tags} size="sm" />
        </div>
      )}
    </article>
  );
}
