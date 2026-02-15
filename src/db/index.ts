import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema';

// Database URL will be provided via environment variable
const connectionString = process.env.DATABASE_URL || 'postgresql://user:password@localhost:5432/dbname';

// Create the neon client and drizzle database instance
const sql = neon(connectionString);
export const db = drizzle(sql, { schema });

// Export schema for easy access
export * from './schema';
export { schema };