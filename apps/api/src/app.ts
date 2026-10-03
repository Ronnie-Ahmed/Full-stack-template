import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import { pinoHttp } from 'pino-http';
import { env } from './config/env.js';
import { logger } from './config/logger.js';
import { errorHandler, notFound } from './middlewares/error.js';
import routes from './routes/index.js';

export const app = express();

app.set('trust proxy', 1); // behind a reverse proxy / load balancer
app.disable('x-powered-by');

app.use(pinoHttp({ logger }));
app.use(helmet());
app.use(cors({ origin: env.CLIENT_ORIGIN, credentials: true }));
app.use(express.json({ limit: '10kb' }));
app.use(cookieParser());
app.use(rateLimit({ windowMs: 60 * 1000, limit: 120, standardHeaders: true, legacyHeaders: false }));

app.use('/api/v1', routes);

app.use(notFound);
app.use(errorHandler);
