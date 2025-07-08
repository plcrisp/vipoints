import { CorsOptions } from 'cors';

const whitelist = [
  'http://localhost:5173',
  'http://127.0.0.1:5173',
  'http://localhost:3000',
  undefined,
];

export const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    // Permite requisições sem 'origin' (como Postman, Swagger, ou apps mobile)
    if (!origin || whitelist.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Bloqueado pelo CORS'));
    }
  },
  credentials: true,
};