"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Message = void 0;
// @ts-ignore
const db_1 = __importDefault(require("../database_connection/db"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
class Message {
    async index() {
        try {
            // @ts-ignore
            const conn = await db_1.default.connect();
            const sql = 'SELECT * FROM user_message';
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        }
        catch (err) {
            throw new Error(`Error: ${err}`);
        }
    }
    async delete(id) {
        try {
            const sql = 'delete FROM user_message WHERE id=($1)';
            // @ts-ignore
            const conn = await db_1.default.connect();
            const result = await conn.query(sql, [id]);
            conn.release();
            if (result.rowCount) {
                return true;
            }
            return false;
        }
        catch (err) {
            throw new Error(`${err}`);
        }
    }
    async create(M) {
        try {
            const sql = 'INSERT INTO user_message(name, phone, email, message, user_id)VALUES ($1,$2,$3,$4,$5) RETURNING *';
            // @ts-ignore
            const conn = await db_1.default.connect();
            const result = await conn.query(sql, [
                M.name,
                M.phone,
                M.email,
                M.message,
                M.user_id
            ]);
            const message = result.rows[0];
            conn.release();
            return message;
        }
        catch (err) {
            throw new Error(`Error ${err}`);
        }
    }
}
exports.Message = Message;
