import { NextRequest, NextResponse } from 'next/server';
import { updateBook, deleteBook, getBookById } from '@/lib/books';

export const dynamic = 'force-dynamic';

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const authHeader = request.headers.get('x-admin-password');
    if (authHeader !== process.env.ADMIN_PASSWORD) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const id = parseInt(params.id, 10);
    const body = await request.json();

    // Auto-generate cover URL from ISBN if ISBN changed and no coverUrl
    if (body.isbn && !body.coverUrl) {
      body.coverUrl = `https://covers.openlibrary.org/b/isbn/${body.isbn}-L.jpg`;
    }

    const book = await updateBook(id, body);
    if (!book) {
      return NextResponse.json({ error: 'Book not found' }, { status: 404 });
    }

    return NextResponse.json(book);
  } catch (error) {
    console.error('PUT /api/books/[id] error:', error);
    return NextResponse.json(
      { error: 'Failed to update book' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const authHeader = request.headers.get('x-admin-password');
    if (authHeader !== process.env.ADMIN_PASSWORD) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const id = parseInt(params.id, 10);
    const existing = await getBookById(id);
    if (!existing) {
      return NextResponse.json({ error: 'Book not found' }, { status: 404 });
    }

    await deleteBook(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('DELETE /api/books/[id] error:', error);
    return NextResponse.json(
      { error: 'Failed to delete book' },
      { status: 500 }
    );
  }
}
