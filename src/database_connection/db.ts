import dotenv from 'dotenv';
import { Pool } from 'pg';

dotenv.config();

const {
  POSTGRES_HOST,
  DEV_POSTGRES_DB,
  TEST_POSTGRES_DB,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  NODE_ENV
} = process.env;

let pool;

if (NODE_ENV === 'test') {
  pool = new Pool({
    host: POSTGRES_HOST,
    database: TEST_POSTGRES_DB,
    user: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
    port: 5433
  });
}

if (NODE_ENV === 'dev') {
  pool = new Pool({
    host: POSTGRES_HOST,
    database: DEV_POSTGRES_DB,
    user: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
    port: 5433
  });
}

export default pool;



// import { Pool } from 'pg';

// function createPool() {
//   const { DATABASE_URL } = process.env;

//   if (!DATABASE_URL) {
//     throw new Error('DATABASE_URL environment variable is not defined');
//   }

//   return new Pool({
//     connectionString: DATABASE_URL,
//     ssl: {
//       rejectUnauthorized: false // For development/testing purposes
//     }
//   });
// }

// const pool = createPool();

// export default pool;
