
import  databasePool  from './pool';

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
