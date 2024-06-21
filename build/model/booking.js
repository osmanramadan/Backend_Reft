"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Booking = void 0;
// @ts-ignore
const db_1 = __importDefault(require("../database_connection/db"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
class Booking {
    async index() {
        try {
            // @ts-ignore
            const conn = await db_1.default.connect();
            const sql = 'SELECT * FROM hall_book_dashboard';
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        }
        catch (err) {
            throw new Error(`Error: ${err}`);
        }
    }
    async teacherbooking(id) {
        try {
            // @ts-ignore
            const conn = await db_1.default.connect();
            const sql = 'SELECT * FROM hall_book_dashboard where user_id=($1)';
            const result = await conn.query(sql, [id]);
            conn.release();
            return result.rows;
        }
        catch (err) {
            throw new Error(`Error: ${err}`);
        }
    }
    async ownerbooking(id) {
        try {
            // @ts-ignore
            const conn = await db_1.default.connect();
            const sql = 'SELECT * FROM hall_book_dashboard where halluser_id=($1)';
            const result = await conn.query(sql, [id]);
            conn.release();
            return result.rows;
        }
        catch (err) {
            throw new Error(`Error: ${err}`);
        }
    }
}
exports.Booking = Booking;
