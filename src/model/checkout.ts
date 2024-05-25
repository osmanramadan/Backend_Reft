// @ts-ignore
import pool from '../database_connection/db';
import dotenv from 'dotenv';
import { bookinfo } from '../types/bookinfo';

dotenv.config();

export class Checkout {

 

  async create(bookinfo:bookinfo): Promise<bookinfo> {
    try {
      const sql =
        'INSERT INTO hall_book(user_id,hall_id,date,day,month,year,hour,code) VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *';
      // @ts-ignore
      const conn = await pool.connect();
      const result = await conn.query(sql, [
        bookinfo.userid,
        bookinfo.hallid,
        bookinfo.date,
        bookinfo.day,
        bookinfo.month,
        bookinfo.year,
        bookinfo.hour,
        bookinfo.code
      ]);
      const book = result.rows[0];
      conn.release();

      return book;
    } catch (err) {
      console.log(err);
      throw new Error(`Error ${err}`);
    }
  }

  
  async gethallcodes(hallid:any): Promise<any[]> {
    try {

      // @ts-ignore
      const conn = await pool.connect();
      const sql = "SELECT code FROM hall_book where hall_id=($1)";

      const result = await conn.query(sql,[hallid]);

      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Error: ${err}`);
    }
  }


}

