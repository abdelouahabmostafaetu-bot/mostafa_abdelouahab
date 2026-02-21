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
    <div className="pt-28 pb-20">
      <div className="max-w-xl mx-auto px-6">
        {/* Header */}
        <div className="mb-12">
          <p className="text-xs uppercase tracking-widest text-[var(--color-accent)] font-medium mb-3">
            Writing
          </p>
          <h1 className="text-4xl font-bold text-[var(--color-text)] mb-3 tracking-tight">
            Blog
          </h1>
          <div className="w-12 h-0.5 bg-[var(--color-accent)]"></div>
        </div>

        {/* Posts */}
        {posts.length > 0 ? (
          <div>
            {posts.map((post, index) => (
              <PostCard
                key={post.slug}
                slug={post.slug}
                title={post.title}
                date={post.date}
                category={post.category}
                excerpt={post.excerpt}
                readingTime={post.readingTime}
                isLast={index === posts.length - 1}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-3xl mb-3">✍️</p>
            <p className="text-sm text-[var(--color-text-secondary)]">
              Posts coming soon.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
