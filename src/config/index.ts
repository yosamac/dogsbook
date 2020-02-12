import  dotenv from 'dotenv';

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const envFound = dotenv.config();

if (!envFound) {
  throw new Error('Couldn\'t find .env file');
}

export default {
  port: parseInt(process.env.PORT, 10) || 3000,
  databaseUrl: process.env.DB_URL || '',
  logs: {
    level: process.env.LOG_LEVEL,
  },
  api: {
    prefix: '/api/v1',
  },
};
