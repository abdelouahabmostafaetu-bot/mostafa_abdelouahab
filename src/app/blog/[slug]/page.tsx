import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Calendar, Clock } from 'lucide-react';
import { getBlogPost, getBlogPosts } from '@/lib/content';
import { renderMDX, extractHeadings } from '@/lib/mdx';
import { formatDate } from '@/lib/utils';
import TableOfContents from '@/components/blog/TableOfContents';
import ScrollAnimation from '@/components/ui/ScrollAnimation';

export async function generateStaticParams() {
  const posts = getBlogPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = getBlogPost(params.slug);
  if (!post) return { title: 'Post Not Found' };
  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: { slug: string };
}) {
  const post = getBlogPost(params.slug);

  if (!post) {
    notFound();
  }

  const content = await renderMDX(post.content);
  const headings = extractHeadings(post.content);

  return (
    <div className="pt-24 pb-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back link */}
        <ScrollAnimation>
          <Link
            href="/blog"
            className="inline-flex items-center gap-1 text-sm text-primary-800 dark:text-primary-300 hover:text-accent-500 transition-colors mb-8 font-medium"
          >
            <ArrowLeft size={14} />
            Back to Blog
          </Link>
        </ScrollAnimation>

        <div className="flex gap-12">
          {/* Main Article */}
          <article className="flex-grow max-w-3xl">
            <ScrollAnimation>
              {/* Header */}
              <header className="mb-8">
                <div className="flex items-center gap-3 mb-4">
                  <span className="px-3 py-1 text-xs font-semibold rounded-full bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-300">
                    {post.category}
                  </span>
                  <span className="flex items-center gap-1 text-sm text-[var(--color-text-secondary)]">
                    <Calendar size={14} />
                    {formatDate(post.date)}
                  </span>
                  <span className="flex items-center gap-1 text-sm text-[var(--color-text-secondary)]">
                    <Clock size={14} />
                    {post.readingTime}
                  </span>
                </div>
                <h1 className="font-heading text-3xl md:text-4xl font-bold text-[var(--color-text)] leading-tight">
                  {post.title}
                </h1>
                {post.excerpt && (
                  <p className="mt-4 text-lg text-[var(--color-text-secondary)] leading-relaxed">
                    {post.excerpt}
                  </p>
                )}
              </header>
            </ScrollAnimation>

            {/* Content */}
            <ScrollAnimation delay={100}>
              <div className="prose-academic">{content}</div>
            </ScrollAnimation>
          </article>

          {/* Table of Contents Sidebar */}
          {headings.length > 0 && (
            <aside className="hidden xl:block w-64 flex-shrink-0">
              <ScrollAnimation delay={200}>
                <TableOfContents headings={headings} />
              </ScrollAnimation>
            </aside>
          )}
        </div>
      </div>
    </div>
  );
}
