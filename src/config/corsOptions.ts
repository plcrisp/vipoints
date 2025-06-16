import { CorsOptions } from 'cors';

const whitelist = ['http://localhost:5173'];

interface OriginCallback {
    (err: Error | null, allow?: boolean): void;
}

interface CustomCorsOptions extends CorsOptions {
    origin: (origin: string | undefined, callback: OriginCallback) => void;
    credentials: boolean;
}

export const corsOptions: CustomCorsOptions = {
    origin: (origin: string | undefined, callback: OriginCallback) => {
        if (!origin || whitelist.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
};