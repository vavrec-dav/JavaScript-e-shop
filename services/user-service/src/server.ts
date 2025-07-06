import app from './app'
import './configurations/config';

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 User service server is running http://localhost:${PORT}`);
});