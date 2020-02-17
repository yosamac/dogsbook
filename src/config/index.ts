import  dotenv from 'dotenv';

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const envFound = dotenv.config();

if (!envFound) {
  throw new Error('Couldn\'t find .env file');
}

export default {
  port: parseInt(process.env.PORT, 10) || 3000,
  logs: {
    level: process.env.LOG_LEVEL || 'DEBUG',
  },
  api: {
    prefix: '/api/v1',
  },
  postgresConfig: {
    user: process.env.POSTGRES_USER || 'sysadmin',
    host: process.env.POSTGRES_HOST || '127.0.0.1',
    database: process.env.POSTGRES_DB || 'dogsbook',
    password: process.env.POSTGRES_PASSWD || 'Sup3rS3cret@',
    port: parseInt(process.env.POSTGRES_PORT, 10) || 5432
  } 
};
