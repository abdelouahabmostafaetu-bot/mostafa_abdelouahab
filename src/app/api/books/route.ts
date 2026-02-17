import { NextRequest, NextResponse } from 'next/server';
import { getBooks, getBookStats, getCategories, createBook } from '@/lib/books';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    // If requesting stats
    if (searchParams.get('stats') === 'true') {
      const stats = await getBookStats();
      return NextResponse.json(stats);
    }

    // If requesting categories
    if (searchParams.get('categories') === 'true') {
      const categories = await getCategories();
      return NextResponse.json(categories);
    }

    const filters = {
      category: searchParams.get('category') || undefined,
      status: searchParams.get('status') || undefined,
      search: searchParams.get('search') || undefined,
      sort: searchParams.get('sort') || undefined,
      page: parseInt(searchParams.get('page') || '1', 10),
      limit: parseInt(searchParams.get('limit') || '12', 10),
    };

    const result = await getBooks(filters);
    return NextResponse.json(result);
  } catch (error) {
    console.error('GET /api/books error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch books' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    // Check admin password
    const authHeader = request.headers.get('x-admin-password');
    if (authHeader !== process.env.ADMIN_PASSWORD) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();

    // Auto-generate cover URL from ISBN if not provided
    if (body.isbn && !body.coverUrl) {
      body.coverUrl = `https://covers.openlibrary.org/b/isbn/${body.isbn}-L.jpg`;
    }

    const book = await createBook(body);
    return NextResponse.json(book, { status: 201 });
  } catch (error) {
    console.error('POST /api/books error:', error);
    return NextResponse.json(
      { error: 'Failed to create book' },
      { status: 500 }
    );
  }
}
