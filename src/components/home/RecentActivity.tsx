import Link from 'next/link';
import { ArrowRight, Calendar, BookOpen, FileText } from 'lucide-react';
import Card from '@/components/ui/Card';
import ScrollAnimation from '@/components/ui/ScrollAnimation';
import { getBlogPosts } from '@/lib/content';
import publications from '@/content/publications.json';

export default function RecentActivity() {
  const posts = getBlogPosts().slice(0, 3);
  const recentPubs = publications.slice(0, 3);

  return (
    <section className="py-20 bg-surface-50 dark:bg-gray-900/50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollAnimation>
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-[var(--color-text)] mb-3">
              Recent Activity
            </h2>
            <p className="text-[var(--color-text-secondary)] max-w-2xl mx-auto">
              Latest blog posts and research updates
            </p>
          </div>
        </ScrollAnimation>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Blog Posts */}
          <ScrollAnimation animation="slide-in-left" delay={100}>
            <div>
              <div className="flex items-center gap-2 mb-4">
                <FileText size={20} className="text-accent-500" />
                <h3 className="font-heading text-xl font-bold text-[var(--color-text)]">
                  Latest Posts
                </h3>
              </div>
              <div className="space-y-3">
                {posts.length > 0 ? (
                  posts.map((post) => (
                    <Link key={post.slug} href={`/blog/${post.slug}`}>
                      <Card className="group" padding="sm">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <h4 className="font-semibold text-[var(--color-text)] group-hover:text-primary-800 dark:group-hover:text-primary-300 transition-colors">
                              {post.title}
                            </h4>
                            <div className="flex items-center gap-3 mt-1 text-xs text-[var(--color-text-secondary)]">
                              <span className="flex items-center gap-1">
                                <Calendar size={12} />
                                {post.date}
                              </span>
                              <span className="px-2 py-0.5 rounded-full bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-300">
                                {post.category}
                              </span>
                            </div>
                          </div>
                          <ArrowRight size={16} className="text-[var(--color-text-secondary)] group-hover:text-accent-500 transition-colors mt-1 flex-shrink-0" />
                        </div>
                      </Card>
                    </Link>
                  ))
                ) : (
                  <Card padding="sm">
                    <p className="text-sm text-[var(--color-text-secondary)]">No posts yet. Check back soon!</p>
                  </Card>
                )}
              </div>
              <Link
                href="/blog"
                className="inline-flex items-center gap-1 text-sm text-primary-800 dark:text-primary-300 hover:text-accent-500 transition-colors mt-4 font-medium"
              >
                View all posts <ArrowRight size={14} />
              </Link>
            </div>
          </ScrollAnimation>

          {/* Recent Publications */}
          <ScrollAnimation animation="slide-in-right" delay={200}>
            <div>
              <div className="flex items-center gap-2 mb-4">
                <BookOpen size={20} className="text-accent-500" />
                <h3 className="font-heading text-xl font-bold text-[var(--color-text)]">
                  Publications
                </h3>
              </div>
              <div className="space-y-3">
                {recentPubs.map((pub, i) => (
                  <Card key={i} className="group" padding="sm">
                    <h4 className="font-semibold text-[var(--color-text)] text-sm">
                      {pub.title}
                    </h4>
                    <p className="text-xs text-[var(--color-text-secondary)] mt-1">
                      {pub.authors.join(', ')}
                    </p>
                    <div className="flex items-center gap-3 mt-1 text-xs text-[var(--color-text-secondary)]">
                      <span>{pub.venue}</span>
                      <span className="text-accent-500 font-medium">{pub.year}</span>
                    </div>
                  </Card>
                ))}
              </div>
              <Link
                href="/research"
                className="inline-flex items-center gap-1 text-sm text-primary-800 dark:text-primary-300 hover:text-accent-500 transition-colors mt-4 font-medium"
              >
                View all research <ArrowRight size={14} />
              </Link>
            </div>
          </ScrollAnimation>
        </div>
      </div>
    </section>
  );
}
