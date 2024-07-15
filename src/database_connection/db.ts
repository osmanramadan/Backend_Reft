import dotenv from 'dotenv';
import { Pool } from 'pg';

dotenv.config();

const {
  POSTGRES_HOST,
  DEV_POSTGRES_DB,
  PROD_POSTGRES_DB,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  PROD_POSTGRES_HOST,
  PROD_POSTGRES_PASSWORD,
  NODE_ENV
} = process.env;

let pool;

if (NODE_ENV =='prod') {
  pool = new Pool({
    host:PROD_POSTGRES_HOST,
    database:PROD_POSTGRES_DB,
    user:POSTGRES_USER,
    password:PROD_POSTGRES_PASSWORD,
    port: 5432,
    ssl: {
      rejectUnauthorized: false, // Insecure option, use for development only
      // Or specify your SSL configuration properly
  }
  });
}

if (NODE_ENV == 'dev') {
  pool = new Pool({
    host:POSTGRES_HOST,
    database:DEV_POSTGRES_DB,
    user:POSTGRES_USER,
    password:POSTGRES_PASSWORD,
    port: 5433
  });
}

export default pool;
