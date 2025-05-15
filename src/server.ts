import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes';
import rewardRoutes from './routes/rewardRoutes';
import rewardRedemptionRoutes from './routes/rewardRedemptionRoutes';
import userRoutes from './routes/userRoutes';

dotenv.config();
const app = express();
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/rewards', rewardRoutes);
app.use("/reward-redemptions", rewardRedemptionRoutes);

app.listen(3000, () => console.log('Servidor rodando na porta 3000'));