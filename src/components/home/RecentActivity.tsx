import Link from 'next/link';
import { ArrowRight, Calendar } from 'lucide-react';
import { getBlogPosts } from '@/lib/content';

export default function RecentActivity() {
  const posts = getBlogPosts().slice(0, 3);

  return (
    <section className="py-20 border-t border-[var(--color-border)]">
      <div className="max-w-2xl mx-auto px-6">
        <h2 className="text-2xl font-bold text-[var(--color-text)] mb-2">
          Latest Posts
        </h2>
        <p className="text-[var(--color-text-secondary)] mb-8">
          Recent writings and explorations
        </p>

        <div className="space-y-1">
          {posts.length > 0 ? (
            posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group flex items-center justify-between py-4 border-b border-[var(--color-border)] hover:pl-2 transition-all"
              >
                <div>
                  <h3 className="font-medium text-[var(--color-text)] group-hover:text-[var(--color-accent)] transition-colors">
                    {post.title}
                  </h3>
                  <div className="flex items-center gap-2 mt-1 text-xs text-[var(--color-text-secondary)]">
                    <Calendar size={12} />
                    <span>{post.date}</span>
                    <span className="text-[var(--color-border)]">&middot;</span>
                    <span>{post.category}</span>
                  </div>
                </div>
                <ArrowRight size={16} className="text-[var(--color-text-secondary)] group-hover:text-[var(--color-accent)] transition-colors flex-shrink-0" />
              </Link>
            ))
          ) : (
            <p className="py-8 text-center text-[var(--color-text-secondary)]">No posts yet. Check back soon!</p>
          )}
        </div>

        <Link
          href="/blog"
          className="inline-flex items-center gap-1 text-sm text-[var(--color-accent)] hover:opacity-80 transition-opacity mt-6 font-medium"
        >
          View all posts <ArrowRight size={14} />
        </Link>
      </div>
    </section>
  );
}
