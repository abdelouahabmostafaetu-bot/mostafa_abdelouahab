import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema';

function getDb() {
  if (!process.env.DATABASE_URL) {
    throw new Error(
      'DATABASE_URL environment variable is not set. Please add it to your .env.local file.'
    );
  }
  const sql = neon(process.env.DATABASE_URL);
  return drizzle(sql, { schema });
}

// Use a proxy to lazily initialize the DB connection on first access
export const db = new Proxy({} as ReturnType<typeof getDb>, {
  get(_target, prop) {
    const instance = getDb();
    return (instance as any)[prop];
  },
});
