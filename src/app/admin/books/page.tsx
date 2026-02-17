'use client';

import { useState, useEffect } from 'react';
import { Book } from '@/db/schema';
import AdminBookForm from '@/components/books/AdminBookForm';
import AdminBookTable from '@/components/books/AdminBookTable';
import { Plus, LogOut, BookOpen } from 'lucide-react';

export default function AdminBooksPage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);

  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingBook, setEditingBook] = useState<Book | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<Book | null>(null);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoginLoading(true);
    setLoginError('');

    try {
      const res = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: loginPassword }),
      });

      if (res.ok) {
        setPassword(loginPassword);
        setAuthenticated(true);
      } else {
        setLoginError('Invalid password. Please try again.');
      }
    } catch {
      setLoginError('Connection error. Please try again.');
    } finally {
      setLoginLoading(false);
    }
  }

  async function fetchBooks() {
    setLoading(true);
    try {
      const res = await fetch('/api/books?limit=1000');
      const data = await res.json();
      setBooks(data.books || []);
    } catch (err) {
      console.error('Failed to fetch books:', err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (authenticated) {
      fetchBooks();
    }
  }, [authenticated]);

  async function handleDelete(book: Book) {
    try {
      const res = await fetch(`/api/books/${book.id}`, {
        method: 'DELETE',
        headers: { 'x-admin-password': password },
      });

      if (res.ok) {
        setDeleteConfirm(null);
        fetchBooks();
      }
    } catch (err) {
      console.error('Delete failed:', err);
    }
  }

  async function handleToggleFavorite(book: Book) {
    try {
      await fetch(`/api/books/${book.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-password': password,
        },
        body: JSON.stringify({ isFavorite: !book.isFavorite }),
      });
      fetchBooks();
    } catch (err) {
      console.error('Toggle favorite failed:', err);
    }
  }

  function handleEdit(book: Book) {
    setEditingBook(book);
    setShowForm(true);
  }

  function handleSaved() {
    setShowForm(false);
    setEditingBook(null);
    fetchBooks();
  }

  function handleCancel() {
    setShowForm(false);
    setEditingBook(null);
  }

  // Login screen
  if (!authenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="max-w-sm w-full">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-primary-800 dark:bg-primary-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <BookOpen size={28} className="text-white" />
            </div>
            <h1 className="font-heading text-2xl font-bold text-[var(--color-text)] mb-2">
              Books Admin
            </h1>
            <p className="text-sm text-[var(--color-text-secondary)]">
              Enter your password to manage your book library.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            {loginError && (
              <div className="bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 p-3 rounded-lg text-sm text-center">
                {loginError}
              </div>
            )}
            <input
              type="password"
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
              placeholder="Enter admin password"
              required
              className="w-full px-4 py-3 rounded-xl border border-[var(--color-border)] bg-white dark:bg-gray-800 text-[var(--color-text)] placeholder:text-[var(--color-text-secondary)] focus:outline-none focus:ring-2 focus:ring-primary-800/30 text-center"
            />
            <button
              type="submit"
              disabled={loginLoading}
              className="w-full px-4 py-3 bg-primary-800 dark:bg-primary-600 text-white rounded-xl font-medium hover:bg-primary-900 dark:hover:bg-primary-700 transition disabled:opacity-50"
            >
              {loginLoading ? 'Checking...' : 'Login'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Admin dashboard
  return (
    <div className="pt-24 pb-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="font-heading text-3xl font-bold text-[var(--color-text)]">
              📚 Book Manager
            </h1>
            <p className="text-sm text-[var(--color-text-secondary)] mt-1">
              {books.length} books in your library
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                setEditingBook(null);
                setShowForm(!showForm);
              }}
              className="flex items-center gap-2 px-4 py-2 bg-accent-500 text-white rounded-lg font-medium text-sm hover:bg-accent-600 transition"
            >
              <Plus size={16} />
              Add New Book
            </button>
            <button
              onClick={() => {
                setAuthenticated(false);
                setPassword('');
                setLoginPassword('');
              }}
              className="flex items-center gap-2 px-4 py-2 border border-[var(--color-border)] text-[var(--color-text-secondary)] rounded-lg font-medium text-sm hover:bg-surface-50 dark:hover:bg-gray-700 transition"
            >
              <LogOut size={16} />
              Logout
            </button>
          </div>
        </div>

        {/* Add/Edit Form */}
        {showForm && (
          <AdminBookForm
            book={editingBook}
            password={password}
            onSaved={handleSaved}
            onCancel={handleCancel}
          />
        )}

        {/* Delete Confirmation */}
        {deleteConfirm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              onClick={() => setDeleteConfirm(null)}
            />
            <div className="relative bg-white dark:bg-gray-800 rounded-xl p-6 max-w-sm w-full shadow-2xl border border-[var(--color-border)]">
              <h3 className="font-heading text-lg font-bold text-[var(--color-text)] mb-2">
                Delete Book?
              </h3>
              <p className="text-sm text-[var(--color-text-secondary)] mb-4">
                Are you sure you want to delete &quot;{deleteConfirm.title}&quot;?
                This cannot be undone.
              </p>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => handleDelete(deleteConfirm)}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg text-sm font-medium hover:bg-red-600 transition"
                >
                  Yes, Delete
                </button>
                <button
                  onClick={() => setDeleteConfirm(null)}
                  className="px-4 py-2 border border-[var(--color-border)] text-[var(--color-text)] rounded-lg text-sm font-medium hover:bg-surface-50 dark:hover:bg-gray-700 transition"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Books Table */}
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-[var(--color-border)] p-4">
          {loading ? (
            <div className="text-center py-12 text-[var(--color-text-secondary)]">
              Loading books...
            </div>
          ) : (
            <AdminBookTable
              books={books}
              onEdit={handleEdit}
              onDelete={(book) => setDeleteConfirm(book)}
              onToggleFavorite={handleToggleFavorite}
            />
          )}
        </div>
      </div>
    </div>
  );
}
