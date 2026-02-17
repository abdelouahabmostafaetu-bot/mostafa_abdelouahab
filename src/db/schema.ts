import {
  pgTable,
  serial,
  text,
  integer,
  boolean,
  timestamp,
} from 'drizzle-orm/pg-core';

export const books = pgTable('books', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  author: text('author').notNull(),
  coverUrl: text('cover_url'),
  isbn: text('isbn'),
  category: text('category').notNull(),
  rating: integer('rating'),
  myReview: text('my_review'),
  status: text('status').notNull().default('want-to-read'),
  dateAdded: timestamp('date_added').defaultNow(),
  isFavorite: boolean('is_favorite').default(false),
  pdfUrl: text('pdf_url'),
  externalLink: text('external_link'),
});

export type Book = typeof books.$inferSelect;
export type NewBook = typeof books.$inferInsert;
