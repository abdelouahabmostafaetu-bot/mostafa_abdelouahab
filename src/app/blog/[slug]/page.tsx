import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Clock } from 'lucide-react';
import { getBlogPost, getBlogPosts } from '@/lib/content';
import { renderMDX, extractHeadings } from '@/lib/mdx';
import { formatDate } from '@/lib/utils';
import TableOfContents from '@/components/blog/TableOfContents';
import { TagList } from '@/components/blog/Tag';

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
          className="group inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.15em] text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] transition-colors duration-200 mb-12"
        >
          <ArrowLeft size={12} className="group-hover:-translate-x-0.5 transition-transform duration-200" />
          All Posts
        </Link>

        <div className="flex gap-14">
          {/* Article */}
          <article className="flex-grow min-w-0">
            <header className="mb-12 pb-8 border-b border-[var(--color-border)]/60">
              {/* Meta */}
              <div className="flex items-center gap-2.5 text-xs text-[var(--color-text-tertiary)] mb-5">
                <time className="font-medium">{formatDate(post.date)}</time>
                <span className="w-1 h-1 rounded-full bg-[var(--color-border)]" />
                <span>{post.category}</span>
                <span className="w-1 h-1 rounded-full bg-[var(--color-border)]" />
                <span className="inline-flex items-center gap-1">
                  <Clock size={11} />
                  {post.readingTime}
                </span>
              </div>

              {/* Title */}
              <h1 className="text-3xl md:text-[2.5rem] font-bold text-[var(--color-text)] leading-[1.2] tracking-tight">
                {post.title}
              </h1>

              {/* Excerpt */}
              {post.excerpt && (
                <p className="mt-5 text-lg text-[var(--color-text-secondary)] leading-relaxed">
                  {post.excerpt}
                </p>
              )}

              {/* Tags */}
              {post.tags.length > 0 && (
                <div className="mt-5">
                  <TagList tags={post.tags} size="md" />
                </div>
              )}
            </header>

            <div className="prose-academic">{content}</div>

            {/* Bottom back link */}
            <div className="mt-16 pt-8 border-t border-[var(--color-border)]/60">
              <Link
                href="/blog"
                className="group inline-flex items-center gap-1.5 text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] transition-colors duration-200 font-medium"
              >
                <ArrowLeft size={14} className="group-hover:-translate-x-0.5 transition-transform duration-200" />
                Back to all posts
              </Link>
            </div>
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
