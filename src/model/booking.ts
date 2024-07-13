// @ts-ignore
import pool from '../database_connection/db';
import dotenv from 'dotenv';
import { dashboardbookinfo } from '../types/bookinfo';

dotenv.config();

export class Booking {
  async index(): Promise<dashboardbookinfo> {
    try {
      // @ts-ignore
      const conn = await pool.connect();
      const sql = 'SELECT * FROM hall_book_dashboard';

      const result = await conn.query(sql);

      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Error: ${err}`);
    }
  }

  async teacherbooking(id: string): Promise<dashboardbookinfo> {
    try {
      // @ts-ignore
      const conn = await pool.connect();
      const sql = 'SELECT * FROM hall_book_dashboard where user_id=($1)';

      const result = await conn.query(sql, [id]);

      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Error: ${err}`);
    }
  }

  async ownerbooking(id: string): Promise<dashboardbookinfo> {
    try {
      // @ts-ignore
      const conn = await pool.connect();
      const sql = 'SELECT * FROM hall_book_dashboard where halluser_id=($1)';

      const result = await conn.query(sql, [id]);

      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Error: ${err}`);
    }
  }
}
