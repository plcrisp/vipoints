import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes';
import rewardRoutes from './routes/rewardRoutes';

dotenv.config();
const app = express();
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/rewards', rewardRoutes);

app.listen(3000, () => console.log('Servidor rodando na porta 3000'));