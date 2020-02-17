
 import express from 'express';
 import cors from 'cors';

 import routes from '../api';
 import { errorHandler } from '../api/middlewares';
 import config from '../config';

export default ({ app }: { app: express.Application }) => {

  app.disable('X-Powered-By');
  app.use(cors());
  app.use(express.json());

  // Load API routes
  app.use(config.api.prefix, routes());
  
  /// catch 404 and forward to error handler
  app.use((req, res, next) => {
    const err = new Error('Not Found');
    err['status'] = 404;
    next(err);
  });

  // error handlers
  app.use(errorHandler);
};

