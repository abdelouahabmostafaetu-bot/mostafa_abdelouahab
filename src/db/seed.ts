import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import { books } from './schema';
import * as dotenv from 'dotenv';

// Load .env.local
dotenv.config({ path: '.env.local' });

async function seed() {
  if (!process.env.DATABASE_URL) {
    console.error('❌ DATABASE_URL not found in .env.local');
    process.exit(1);
  }

  const sql = neon(process.env.DATABASE_URL);
  const db = drizzle(sql);

  console.log('🔄 Creating books table...');

  // Create the table if it doesn't exist
  await sql`
    CREATE TABLE IF NOT EXISTS books (
      id SERIAL PRIMARY KEY,
      title TEXT NOT NULL,
      author TEXT NOT NULL,
      cover_url TEXT,
      isbn TEXT,
      category TEXT NOT NULL,
      rating INTEGER,
      my_review TEXT,
      status TEXT NOT NULL DEFAULT 'want-to-read',
      date_added TIMESTAMP DEFAULT NOW(),
      is_favorite BOOLEAN DEFAULT FALSE,
      pdf_url TEXT,
      external_link TEXT
    )
  `;

  console.log('✅ Table created successfully');

  // Check if books already exist
  const existing = await sql`SELECT COUNT(*) as count FROM books`;
  const count = parseInt(existing[0].count as string, 10);

  if (count > 0) {
    console.log(`⚠️  Database already has ${count} books. Skipping seed.`);
    console.log('   To re-seed, first run: DELETE FROM books;');
    return;
  }

  console.log('🔄 Inserting sample books...');

  const sampleBooks = [
    {
      title: 'Principles of Mathematical Analysis',
      author: 'Walter Rudin',
      coverUrl: 'https://covers.openlibrary.org/b/isbn/007054235X-L.jpg',
      isbn: '007054235X',
      category: 'Analysis',
      rating: 5,
      myReview:
        'The gold standard for rigorous real analysis. Every serious mathematics student should work through this book.',
      status: 'completed',
      isFavorite: true,
      pdfUrl: null,
      externalLink: null,
    },
    {
      title: 'Complex Analysis',
      author: 'Lars Ahlfors',
      coverUrl: 'https://covers.openlibrary.org/b/isbn/0070006571-L.jpg',
      isbn: '0070006571',
      category: 'Analysis',
      rating: 5,
      myReview:
        'A masterpiece of clarity in complex analysis. The treatment of conformal mappings is exceptional.',
      status: 'completed',
      isFavorite: true,
      pdfUrl: null,
      externalLink: null,
    },
    {
      title: 'Topology',
      author: 'James Munkres',
      coverUrl: 'https://covers.openlibrary.org/b/isbn/0131816292-L.jpg',
      isbn: '0131816292',
      category: 'Topology',
      rating: 5,
      myReview:
        'The most accessible introduction to point-set and algebraic topology. Beautifully written.',
      status: 'completed',
      isFavorite: true,
      pdfUrl: null,
      externalLink: null,
    },
    {
      title: 'Algebra',
      author: 'Serge Lang',
      coverUrl: 'https://covers.openlibrary.org/b/isbn/038795385X-L.jpg',
      isbn: '038795385X',
      category: 'Algebra',
      rating: 4,
      myReview: 'Comprehensive graduate algebra reference. Dense but rewarding.',
      status: 'completed',
      isFavorite: false,
      pdfUrl: null,
      externalLink: null,
    },
    {
      title: 'Ordinary Differential Equations',
      author: 'V.I. Arnold',
      coverUrl: 'https://covers.openlibrary.org/b/isbn/0262510189-L.jpg',
      isbn: '0262510189',
      category: 'Analysis',
      rating: 5,
      myReview:
        "Arnold's geometric approach to ODEs is refreshingly original.",
      status: 'reading',
      isFavorite: true,
      pdfUrl: null,
      externalLink: null,
    },
    {
      title: 'A Course of Modern Analysis',
      author: 'Whittaker & Watson',
      coverUrl: 'https://covers.openlibrary.org/b/isbn/0521588073-L.jpg',
      isbn: '0521588073',
      category: 'Analysis',
      rating: 5,
      myReview:
        'The classic reference for special functions and complex analysis techniques.',
      status: 'want-to-read',
      isFavorite: false,
      pdfUrl: null,
      externalLink: null,
    },
    {
      title: 'Counterexamples in Analysis',
      author: 'Gelbaum & Olmsted',
      coverUrl: 'https://covers.openlibrary.org/b/isbn/0486428753-L.jpg',
      isbn: '0486428753',
      category: 'Analysis',
      rating: 4,
      myReview:
        'Sharpens intuition by showing exactly where naive reasoning fails.',
      status: 'completed',
      isFavorite: false,
      pdfUrl: null,
      externalLink: null,
    },
    {
      title: 'Concrete Mathematics',
      author: 'Graham, Knuth & Patashnik',
      coverUrl: 'https://covers.openlibrary.org/b/isbn/0201558025-L.jpg',
      isbn: '0201558025',
      category: 'General Mathematics',
      rating: 5,
      myReview:
        'Perfect blend of continuous and discrete mathematics. The best book on sums and identities.',
      status: 'reading',
      isFavorite: true,
      pdfUrl: null,
      externalLink: null,
    },
  ];

  for (const book of sampleBooks) {
    await db.insert(books).values(book);
    console.log(`  ✅ Added: "${book.title}"`);
  }

  console.log('\n🎉 Seed completed! All sample books have been added.');
}

seed().catch((err) => {
  console.error('❌ Seed failed:', err);
  process.exit(1);
});
