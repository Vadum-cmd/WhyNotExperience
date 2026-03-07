import { readFileSync } from 'fs';
import { join } from 'path';
import { pool } from '../shared/database/connection';

async function migrate() {
  try {
    // Try to read from dist first (production), then from src (development)
    let schemaPath = join(__dirname, 'schema.sql');
    try {
      readFileSync(schemaPath, 'utf-8');
    } catch {
      // If not in dist, try src directory
      schemaPath = join(__dirname, '../src/database/schema.sql');
    }
    const schema = readFileSync(schemaPath, 'utf-8');
    await pool.query(schema);
    console.log('✅ Database migration completed successfully');
  } catch (error) {
    console.error('❌ Database migration failed:', error);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

migrate();

