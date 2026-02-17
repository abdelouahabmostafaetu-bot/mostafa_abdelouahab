import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { calculateReadingTime } from './utils';

const BLOG_DIR = path.join(process.cwd(), 'src', 'content', 'blog');

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  category: string;
  excerpt: string;
  readingTime: string;
  content: string;
}

export function getBlogPosts(): BlogPost[] {
  if (!fs.existsSync(BLOG_DIR)) {
    return [];
  }

  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith('.mdx'));

  const posts = files
    .map((filename) => {
      const slug = filename.replace(/\.mdx$/, '');
      const filePath = path.join(BLOG_DIR, filename);
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      const { data, content } = matter(fileContent);

      return {
        slug,
        title: data.title || 'Untitled',
        date: data.date || '',
        category: data.category || 'Uncategorized',
        excerpt: data.excerpt || '',
        readingTime: calculateReadingTime(content),
        content,
      };
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return posts;
}

export function getBlogPost(slug: string): BlogPost | null {
  const filePath = path.join(BLOG_DIR, `${slug}.mdx`);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(fileContent);

  return {
    slug,
    title: data.title || 'Untitled',
    date: data.date || '',
    category: data.category || 'Uncategorized',
    excerpt: data.excerpt || '',
    readingTime: calculateReadingTime(content),
    content,
  };
}

export function getBlogCategories(): string[] {
  const posts = getBlogPosts();
  const categories = new Set(posts.map((p) => p.category));
  return ['All', ...Array.from(categories)];
}
