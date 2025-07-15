import app from './app'
import './configurations/config';
import { closeDb, databasePool } from './configurations/database'
import http from 'http';

const PORT = process.env.PORT || 3000;
let server: http.Server;

async function testDBConnection() {
  try {
    const client = await databasePool.connect();
    console.log('Connected to the database successfully');
    client.release();
  } catch (error) {
    console.error('Database connection error:', error);
    throw new Error('Failed to connect to the database');
  }
}

async function gracefulShutdown() {
  console.log('Shutting down gracefully...');
  await closeDb();
  if (server) {
    server.close(() => {
      console.log('HTTP server closed');
    });
  } else {
    console.log('No HTTP server to close');
  }


}
async function startServer() {
  await testDBConnection();
  server = app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
  });
}

process.on('SIGINT', gracefulShutdown);
process.on('SIGTERM', gracefulShutdown);


startServer();