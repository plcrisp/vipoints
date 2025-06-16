import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes';
import rewardRoutes from './routes/rewardRoutes';
import rewardRedemptionRoutes from './routes/rewardRedemptionRoutes';
import userRoutes from './routes/userRoutes';
import { setupSwagger } from './swagger';
import { corsOptions } from './config/corsOptions';

dotenv.config();
const app = express();
app.use(cors(corsOptions));
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/rewards', rewardRoutes);
app.use("/reward-redemptions", rewardRedemptionRoutes);

setupSwagger(app);

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
  console.log('Swagger docs at http://localhost:3000/api-docs');
});