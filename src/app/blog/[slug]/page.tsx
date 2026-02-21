import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Calendar, Clock } from 'lucide-react';
import { getBlogPost, getBlogPosts } from '@/lib/content';
import { renderMDX, extractHeadings } from '@/lib/mdx';
import { formatDate } from '@/lib/utils';
import TableOfContents from '@/components/blog/TableOfContents';

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
      <div className="max-w-3xl mx-auto px-6">
        {/* Back */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-1 text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text)] transition-colors mb-8"
        >
          <ArrowLeft size={14} />
          Back to Blog
        </Link>

        <div className="flex gap-12">
          {/* Article */}
          <article className="flex-grow min-w-0">
            <header className="mb-8">
              <div className="flex items-center gap-3 mb-3 text-sm text-[var(--color-text-secondary)]">
                <span className="px-2 py-0.5 rounded bg-[var(--color-surface)] text-xs font-medium">
                  {post.category}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar size={14} />
                  {formatDate(post.date)}
                </span>
                <span className="flex items-center gap-1">
                  <Clock size={14} />
                  {post.readingTime}
                </span>
              </div>
              <h1 className="text-3xl font-bold text-[var(--color-text)] leading-tight">
                {post.title}
              </h1>
              {post.excerpt && (
                <p className="mt-3 text-[var(--color-text-secondary)] leading-relaxed">
                  {post.excerpt}
                </p>
              )}
            </header>

            <div className="prose-academic">{content}</div>
          </article>

          {/* ToC */}
          {headings.length > 0 && (
            <aside className="hidden xl:block w-56 flex-shrink-0">
              <TableOfContents headings={headings} />
            </aside>
          )}
        </div>
      </div>
    </div>
  );
}
