import 'reflect-metadata';

import config from './config';
import express from 'express';
import Logger from './loaders/logger';

const PORT = config.port

async function startServer() {
  const app: express.Express = express();

  /**
   * A little hack here
   * Import/Export can only be used in 'top-level code'
   * Well, at least in node 10 without babel and at the time of writing
   * So we are using good old require.
   **/
  await require('./loaders').default({ expressApp: app });

  app.listen(config.port, (err: any):void => {
    if (err) {
      Logger.error(err);
      process.exit(1);
      return;
    }
    console.info(`
      ####################################################
      🛡️  Server listening on port: http://localhost:${config.port} 🛡️
      ####################################################
    `);
  });
}

startServer();
