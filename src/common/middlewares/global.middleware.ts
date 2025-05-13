import express, { Application } from 'express';
import cors from 'cors';
import limiter from './rate-limiter.middleware';
import ipBlacklist from './ip-blacklist.middleware';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import { httpLogger } from './http-logger.middleware';
import { config } from '../../config';

export function setupGlobalMiddleware(app: Application) {
  app
    .use(express.json())
    .use(bodyParser.json())
    .use(cookieParser())
    .use(
      cors({
        origin: (origin, callback) => {
          if (
            !origin ||
            config.cors.pattern.test(origin) ||
            config.cors.origins.includes(origin)
          ) {
            callback(null, true);
          } else {
            callback(new Error('Not allowed by CORS'));
          }
        },
        credentials: true,
      }),
    )
    .set('trust proxy', 1)
    .use(limiter)
    .use(ipBlacklist)
    .use(httpLogger);
}
