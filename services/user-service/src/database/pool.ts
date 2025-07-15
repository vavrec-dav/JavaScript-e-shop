import { Pool } from 'pg';

const databasePool = new Pool({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || '5432', 10)
});

databasePool.on('connect', () => console.log('DB pool connected'));
databasePool.on('error', (err) => console.error('DB Pool error:', err));

export default databasePool;