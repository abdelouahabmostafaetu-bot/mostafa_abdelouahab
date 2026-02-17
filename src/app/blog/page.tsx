import type { Metadata } from 'next';
import PostCard from '@/components/blog/PostCard';
import ScrollAnimation from '@/components/ui/ScrollAnimation';
import { getBlogPosts } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Articles on mathematics, research notes, tutorials, and more.',
};

export default function BlogPage() {
  const posts = getBlogPosts();

  return (
    <div className="pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <ScrollAnimation>
          <div className="text-center mb-12">
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-[var(--color-text)] mb-4">
              Blog
            </h1>
            <p className="text-lg text-[var(--color-text-secondary)] max-w-2xl mx-auto">
              Mathematical explorations, research notes, tutorials, and personal reflections
            </p>
          </div>
        </ScrollAnimation>

        {/* Posts */}
        {posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {posts.map((post, index) => (
              <ScrollAnimation key={post.slug} delay={index * 100}>
                <PostCard
                  slug={post.slug}
                  title={post.title}
                  date={post.date}
                  category={post.category}
                  excerpt={post.excerpt}
                  readingTime={post.readingTime}
                />
              </ScrollAnimation>
            ))}
          </div>
        ) : (
          <ScrollAnimation>
            <div className="text-center py-20 bg-surface-50 dark:bg-gray-800 rounded-xl border border-[var(--color-border)]">
              <p className="text-5xl mb-4">✍️</p>
              <h3 className="font-heading text-xl font-bold text-[var(--color-text)] mb-2">
                Coming Soon
              </h3>
              <p className="text-[var(--color-text-secondary)]">
                Blog posts are on the way. Check back soon!
              </p>
            </div>
          </ScrollAnimation>
        )}
      </div>
    </div>
  );
}
