
import { Pool } from 'pg';

export const databasePool = new Pool({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || '5432', 10)
});

export async function testDBConnection() {
  try {
    const client = await databasePool.connect();
    client.release();
  } catch (error) {
    throw new Error('Failed to connect to the database');
  }
}

export async function closeDb() {
    await databasePool.end();
    console.log('PostgreSQL pool closed');
}


