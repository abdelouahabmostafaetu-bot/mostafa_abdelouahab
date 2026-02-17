import Link from 'next/link';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import Card from '@/components/ui/Card';

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
    <Link href={`/blog/${slug}`}>
      <Card className="group h-full">
        <div className="flex flex-col h-full">
          {/* Category & Date */}
          <div className="flex items-center gap-3 mb-3">
            <span className="px-3 py-1 text-xs font-semibold rounded-full bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-300">
              {category}
            </span>
            <span className="flex items-center gap-1 text-xs text-[var(--color-text-secondary)]">
              <Calendar size={12} />
              {date}
            </span>
          </div>

          {/* Title */}
          <h3 className="font-heading text-lg font-bold text-[var(--color-text)] mb-2 group-hover:text-primary-800 dark:group-hover:text-primary-300 transition-colors leading-tight">
            {title}
          </h3>

          {/* Excerpt */}
          <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed mb-4 flex-grow line-clamp-3">
            {excerpt}
          </p>

          {/* Footer */}
          <div className="flex items-center justify-between text-xs text-[var(--color-text-secondary)]">
            <span className="flex items-center gap-1">
              <Clock size={12} />
              {readingTime}
            </span>
            <span className="flex items-center gap-1 text-primary-800 dark:text-primary-300 group-hover:text-accent-500 transition-colors font-medium">
              Read more <ArrowRight size={12} />
            </span>
          </div>
        </div>
      </Card>
    </Link>
  );
}
