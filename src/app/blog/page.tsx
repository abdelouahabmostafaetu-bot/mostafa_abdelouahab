import type { Metadata } from 'next';
import PostCard from '@/components/blog/PostCard';
import { getBlogPosts } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Articles on mathematics, research notes, tutorials, and more.',
};

export default function BlogPage() {
  const posts = getBlogPosts();

  return (
    <div className="pt-24 pb-16">
      <div className="max-w-2xl mx-auto px-6">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-[var(--color-text)] mb-2">
            Blog
          </h1>
          <p className="text-[var(--color-text-secondary)]">
            Mathematical explorations, notes, and tutorials
          </p>
        </div>

        {/* Posts */}
        {posts.length > 0 ? (
          <div className="space-y-4">
            {posts.map((post) => (
              <PostCard
                key={post.slug}
                slug={post.slug}
                title={post.title}
                date={post.date}
                category={post.category}
                excerpt={post.excerpt}
                readingTime={post.readingTime}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 rounded-lg border border-[var(--color-border)]">
            <p className="text-4xl mb-3">✍️</p>
            <h3 className="text-lg font-semibold text-[var(--color-text)] mb-1">
              Coming Soon
            </h3>
            <p className="text-sm text-[var(--color-text-secondary)]">
              Blog posts are on the way.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
