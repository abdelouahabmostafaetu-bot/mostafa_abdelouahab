import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
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
    <div className="pt-28 pb-20">
      <div className="max-w-3xl mx-auto px-6">
        {/* Back */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] transition-colors mb-10"
        >
          <ArrowLeft size={12} />
          All Posts
        </Link>

        <div className="flex gap-14">
          {/* Article */}
          <article className="flex-grow min-w-0">
            <header className="mb-10 pb-8 border-b border-[var(--color-border)]">
              <div className="flex items-center gap-2 text-xs text-[var(--color-text-secondary)] mb-4">
                <time>{formatDate(post.date)}</time>
                <span className="text-[var(--color-border)]">/</span>
                <span>{post.category}</span>
                <span className="text-[var(--color-border)]">/</span>
                <span>{post.readingTime}</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-[var(--color-text)] leading-tight tracking-tight">
                {post.title}
              </h1>
              {post.excerpt && (
                <p className="mt-4 text-lg text-[var(--color-text-secondary)] leading-relaxed">
                  {post.excerpt}
                </p>
              )}
            </header>

            <div className="prose-academic">{content}</div>
          </article>

          {/* ToC */}
          {headings.length > 0 && (
            <aside className="hidden xl:block w-48 flex-shrink-0">
              <TableOfContents headings={headings} />
            </aside>
          )}
        </div>
      </div>
    </div>
  );
}
