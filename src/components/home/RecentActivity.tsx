import Link from 'next/link';
import { ArrowRight, Calendar, Clock } from 'lucide-react';
import { getBlogPosts } from '@/lib/content';

export default function RecentActivity() {
  const posts = getBlogPosts().slice(0, 3);

  return (
    <section className="py-24">
      {/* Subtle separator */}
      <div className="max-w-2xl mx-auto px-6">
        <div className="h-px bg-gradient-to-r from-transparent via-[var(--color-border)] to-transparent mb-24" />
      </div>

      <div className="max-w-2xl mx-auto px-6">
        {/* Section Header */}
        <div className="mb-10">
          <p className="text-xs uppercase tracking-[0.15em] text-[var(--color-accent)] font-medium mb-3">
            Recently Published
          </p>
          <h2 className="text-2xl font-bold text-[var(--color-text)] mb-2 tracking-tight">
            Latest Posts
          </h2>
          <p className="text-sm text-[var(--color-text-secondary)]">
            Recent writings on mathematics and research
          </p>
        </div>

        {/* Posts */}
        <div className="space-y-0">
          {posts.length > 0 ? (
            posts.map((post, index) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group flex items-start justify-between gap-4 py-5 border-b border-[var(--color-border)]/60 hover:border-[var(--color-border)] transition-all duration-200"
              >
                <div className="min-w-0 flex-1">
                  <h3 className="font-medium text-[var(--color-text)] group-hover:text-[var(--color-accent)] transition-colors duration-200 leading-snug mb-1.5">
                    {post.title}
                  </h3>
                  <div className="flex items-center gap-3 text-xs text-[var(--color-text-tertiary)]">
                    <span className="inline-flex items-center gap-1">
                      <Calendar size={11} />
                      {post.date}
                    </span>
                    <span className="w-1 h-1 rounded-full bg-[var(--color-border)]" />
                    <span>{post.category}</span>
                  </div>
                </div>
                <ArrowRight
                  size={15}
                  className="mt-1.5 text-[var(--color-text-tertiary)] group-hover:text-[var(--color-accent)] group-hover:translate-x-0.5 transition-all duration-200 flex-shrink-0"
                />
              </Link>
            ))
          ) : (
            <div className="py-12 text-center">
              <p className="text-sm text-[var(--color-text-secondary)]">
                No posts yet. Check back soon.
              </p>
            </div>
          )}
        </div>

        {/* View All Link */}
        {posts.length > 0 && (
          <Link
            href="/blog"
            className="group inline-flex items-center gap-1.5 text-sm text-[var(--color-accent)] hover:text-[var(--color-accent-light)] transition-colors duration-200 mt-8 font-medium"
          >
            View all posts
            <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform duration-200" />
          </Link>
        )}
      </div>
    </section>
  );
}
