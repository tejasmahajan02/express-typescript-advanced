import express, { Application } from 'express';
import {
  errorHandlerMiddleware,
  notFoundMiddleware,
} from './common/middlewares';

import { setupGlobalMiddleware } from './common/middlewares/global.middleware';
import apiRouter from './modules/api.router';
import { JwtPayload } from 'jsonwebtoken';
import { logRoutes } from './common/utils';

declare module 'express-serve-static-core' {
  export interface Request {
    user?: JwtPayload;
  }
}

export function createApp(): Application {
  const app = express();

  setupGlobalMiddleware(app);

  app.use('/api', apiRouter);

  // Global error handler (should be after routes)
  app.use(notFoundMiddleware).use(errorHandlerMiddleware);

  logRoutes(app);

  return app;
}

export default createApp;
