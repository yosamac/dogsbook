import { Router } from 'express';
import userController from './routes/user';

// guaranteed to get dependencies
export default () => {
  const app = Router();
  userController(app);

  return app;
};
