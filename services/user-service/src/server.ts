import app from './app'
import './configurations/envVariables';
import { testDBConnection, closeDb } from './manager/databaseManager';

import http from 'http';

const PORT = process.env.PORT || 3000;
let server: http.Server;

async function startServer() {
  await testDBConnection();
  server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
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


process.on('SIGINT', gracefulShutdown);
process.on('SIGTERM', gracefulShutdown);


startServer();