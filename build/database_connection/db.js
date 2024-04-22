"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const pg_1 = require("pg");
dotenv_1.default.config();
const { POSTGRES_HOST, DEV_POSTGRES_DB, TEST_POSTGRES_DB, POSTGRES_USER, POSTGRES_PASSWORD, NODE_ENV } = process.env;
let pool;
if (NODE_ENV === 'test') {
    pool = new pg_1.Pool({
        host: POSTGRES_HOST,
        database: TEST_POSTGRES_DB,
        user: POSTGRES_USER,
        password: POSTGRES_PASSWORD,
        port: 5433
    });
}
if (NODE_ENV === 'dev') {
    const pool = new pg_1.Pool({
        connectionString: "postgres://reftreft:DTZP2yVvBk2r5u7lI0QHesrPWmbuRrZD@dpg-cne14if109ks738tgq60-a.oregon-postgres.render.com/reft",
        ssl: {
            rejectUnauthorized: false
        }
    });
    pool.connect()
        .then((client) => {
        console.log("Connected to PostgreSQL");
        // You can use 'client' to execute queries or simply release the client
        client.release();
    })
        .catch((err) => {
        console.error("Error connecting to PostgreSQL:", err);
    });
}
// if (NODE_ENV === 'dev') {
//   pool = new Pool({
//     host: "dpg-cne14if109ks738tgq60-a",
//     database:"reft",
//     user: "reftreft",
//     password: "DTZP2yVvBk2r5u7lI0QHesrPWmbuRrZD",
//     port: 5432
//   });
//   const conn =  pool.connect()
//   console.log("from pool",conn,pool)
// }
exports.default = pool;
