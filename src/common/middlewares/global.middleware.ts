import express, { Application } from 'express';
import cors from 'cors';
import limiter from './rate-limiter.middleware';
import ipBlacklist from './ip-blacklist.middleware';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import { httpLogger } from './http-logger.middleware';
import { corsOptions } from '../../config/cors-options.config';

export function setupGlobalMiddleware(app: Application) {
  app
    .use(express.json())
    .use(bodyParser.json())
    .use(cookieParser())
    .use(cors(corsOptions))
    .set('trust proxy', 1)
    .use(limiter)
    .use(ipBlacklist)
    .use(httpLogger);
}
