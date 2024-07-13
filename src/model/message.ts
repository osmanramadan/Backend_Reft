// @ts-ignore
import pool from '../database_connection/db';
import dotenv from 'dotenv';
import { message } from '../types/message';

dotenv.config();

export class Message {
  async index(): Promise<message[]> {

    try {
      // @ts-ignore
      const conn = await pool.connect();
      const sql = 'SELECT * FROM user_message';

      const result = await conn.query(sql);

      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Error: ${err}`);
    }
  }

  async delete(id: string): Promise<boolean> {
    try {
      const sql = 'delete FROM user_message WHERE id=($1)';
      // @ts-ignore
      const conn = await pool.connect();

      const result = await conn.query(sql, [id]);
      conn.release();
      if (result.rowCount) {
        return true;
      }
      return false;
    } catch (err) {
      throw new Error(`${err}`);
    }
  }

  async create(M: message): Promise<message> {
    try {
      const sql =
        'INSERT INTO user_message(name, phone, email, message, user_id)VALUES ($1,$2,$3,$4,$5) RETURNING *';
      // @ts-ignore
      const conn = await pool.connect();
   
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
    } catch (err) {

      throw new Error(`Error ${err}`);
    }
  }
}
