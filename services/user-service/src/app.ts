import express from 'express';
import cors from 'cors';
import { swaggerSpec, swaggerUi } from './configurations/swagger';
import userRouter from './routes/userRoute';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec)); 
app.use('/api/v1/user', userRouter);

export default app;