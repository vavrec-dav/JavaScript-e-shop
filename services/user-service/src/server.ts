import dotenv from 'dotenv';
import app from './app'
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../.env') });

console.log('🚀 User service is starting... ' + JSON.stringify(process.env));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 User service server is running http://localhost:${PORT}`);
});