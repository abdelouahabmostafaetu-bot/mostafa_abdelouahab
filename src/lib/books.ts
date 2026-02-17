import { db } from '@/db';
import { books, type Book } from '@/db/schema';
import { eq, ilike, or, desc, asc, sql, and } from 'drizzle-orm';

export type BookFilters = {
  category?: string;
  status?: string;
  search?: string;
  sort?: string;
  page?: number;
  limit?: number;
};

export async function getBooks(filters: BookFilters = {}) {
  const { category, status, search, sort = 'recent', page = 1, limit = 12 } = filters;

  const conditions = [];

  if (category && category !== 'All') {
    conditions.push(eq(books.category, category));
  }

  if (status && status !== 'All') {
    const statusMap: Record<string, string> = {
      Completed: 'completed',
      Reading: 'reading',
      'Want to Read': 'want-to-read',
    };
    conditions.push(eq(books.status, statusMap[status] || status));
  }

  if (search) {
    conditions.push(
      or(
        ilike(books.title, `%${search}%`),
        ilike(books.author, `%${search}%`)
      )!
    );
  }

  let orderBy;
  switch (sort) {
    case 'rating':
      orderBy = desc(books.rating);
      break;
    case 'title':
      orderBy = asc(books.title);
      break;
    case 'author':
      orderBy = asc(books.author);
      break;
    case 'recent':
    default:
      orderBy = desc(books.dateAdded);
      break;
  }

  const where = conditions.length > 0 ? and(...conditions) : undefined;
  const offset = (page - 1) * limit;

  const [results, countResult] = await Promise.all([
    db
      .select()
      .from(books)
      .where(where)
      .orderBy(orderBy)
      .limit(limit)
      .offset(offset),
    db
      .select({ count: sql<number>`cast(count(*) as integer)` })
      .from(books)
      .where(where),
  ]);

  return {
    books: results,
    total: countResult[0].count,
    page,
    totalPages: Math.ceil(countResult[0].count / limit),
  };
}

export async function getBookStats() {
  const result = await db
    .select({
      total: sql<number>`cast(count(*) as integer)`,
      completed: sql<number>`cast(count(*) filter (where status = 'completed') as integer)`,
      reading: sql<number>`cast(count(*) filter (where status = 'reading') as integer)`,
      favorites: sql<number>`cast(count(*) filter (where is_favorite = true) as integer)`,
    })
    .from(books);

  return result[0];
}

export async function getCategories(): Promise<string[]> {
  const result = await db
    .selectDistinct({ category: books.category })
    .from(books)
    .orderBy(asc(books.category));

  return result.map((r) => r.category);
}

export async function getBookById(id: number): Promise<Book | undefined> {
  const result = await db.select().from(books).where(eq(books.id, id));
  return result[0];
}

export async function createBook(data: Omit<Book, 'id' | 'dateAdded'>) {
  const result = await db.insert(books).values(data).returning();
  return result[0];
}

export async function updateBook(id: number, data: Partial<Book>) {
  const result = await db.update(books).set(data).where(eq(books.id, id)).returning();
  return result[0];
}

export async function deleteBook(id: number) {
  await db.delete(books).where(eq(books.id, id));
}
