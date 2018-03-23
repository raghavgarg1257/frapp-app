import dotenv from 'dotenv';

// injecting environment variables
dotenv.config();

export default {
  env: process.env.NODE_ENV || 'development',
  api: {
    host: process.env.API_HOST,
    port: process.env.API_PORT,
  },
  db: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    name: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
  },
  jwt: {
    secret: 'somethingveryrandom',
    expiry: '1h',
  },
};
