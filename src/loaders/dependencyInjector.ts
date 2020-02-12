import { Container } from 'typedi';
import LoggerInstance from './logger';

export default () => {
  try {
   
    Container.set('logger', LoggerInstance)

    return { status : true };
  } catch (err) {
    console.error('🔥 Error on dependency injector loader: %o', err);
    throw err;
  }
};
