// @ts-ignore
import pool from '../database_connection/db';
import dotenv from 'dotenv';
import { bookinfo, dashboardbookinfo } from '../types/bookinfo';

dotenv.config();

export class Checkout {
  async create(bookinfo: bookinfo): Promise<bookinfo> {
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
      throw new Error(`Error ${err}`);
    }
  }

  async createonehour(dashboardbookinfo: dashboardbookinfo): Promise<bookinfo> {
    try {
      const sql =
        'INSERT INTO hall_book_dashboard(user_id,hall_id,halluser_id,date,onehour,type,amount,secretcode) VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *';
      // @ts-ignore
      const conn = await pool.connect();
      const result = await conn.query(sql, [
        dashboardbookinfo.userid,
        dashboardbookinfo.hallid,
        dashboardbookinfo.halluserid,
        dashboardbookinfo.date,
        dashboardbookinfo.hour,
        dashboardbookinfo.type,
        dashboardbookinfo.amount,
        dashboardbookinfo.secretcode
      ]);
      const book = result.rows[0];
      conn.release();

      return book;
    } catch (err) {
      throw new Error(`Error ${err}`);
    }
  }

  async createintervalhours(
    dashboardbookinfo: dashboardbookinfo
  ): Promise<bookinfo> {
    try {
      const sql =
        'INSERT INTO hall_book_dashboard(user_id,hall_id,halluser_id,date,hourfrom,hourto,type,amount,secretcode) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING *';
      // @ts-ignore
      const conn = await pool.connect();
      const result = await conn.query(sql, [
        dashboardbookinfo.userid,
        dashboardbookinfo.hallid,
        dashboardbookinfo.halluserid,
        dashboardbookinfo.date,
        dashboardbookinfo.hourfrom,
        dashboardbookinfo.hourto,
        dashboardbookinfo.type,
        dashboardbookinfo.amount,
        dashboardbookinfo.secretcode
      ]);
      const book = result.rows[0];
      conn.release();

      return book;
    } catch (err) {
      throw new Error(`Error ${err}`);
    }
  }

  async createintervaldays(
    dashboardbookinfo: dashboardbookinfo
  ): Promise<bookinfo> {
    try {
      const sql =
        'INSERT INTO hall_book_dashboard(user_id,hall_id,halluser_id,datefrom,dateto,onehour,type,amount,secretcode) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING *';
      // @ts-ignore
      const conn = await pool.connect();
      const result = await conn.query(sql, [
        dashboardbookinfo.userid,
        dashboardbookinfo.hallid,
        dashboardbookinfo.halluserid,
        dashboardbookinfo.datefrom,
        dashboardbookinfo.dateto,
        dashboardbookinfo.hour,
        dashboardbookinfo.type,
        dashboardbookinfo.amount,
        dashboardbookinfo.secretcode
      ]);
      const book = result.rows[0];
      conn.release();

      return book;
    } catch (err) {
      throw new Error(`Error ${err}`);
    }
  }

  async createintervalhoursdays(
    dashboardbookinfo: dashboardbookinfo
  ): Promise<bookinfo> {
    try {
      const sql =
        'INSERT INTO hall_book_dashboard(user_id,hall_id,halluser_id,hourfrom,hourto,datefrom,dateto,type,amount,secretcode) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10) RETURNING *';
      // @ts-ignore
      const conn = await pool.connect();
      const result = await conn.query(sql, [
        dashboardbookinfo.userid,
        dashboardbookinfo.hallid,
        dashboardbookinfo.halluserid,
        dashboardbookinfo.hourfrom,
        dashboardbookinfo.hourto,
        dashboardbookinfo.datefrom,
        dashboardbookinfo.dateto,
        dashboardbookinfo.type,
        dashboardbookinfo.amount,
        dashboardbookinfo.secretcode
      ]);
      const book = result.rows[0];
      conn.release();

      return book;
    } catch (err) {
      throw new Error(`Error ${err}`);
    }
  }

  async gethallcodes(hallid: any): Promise<any[]> {
    try {
      // @ts-ignore
      const conn = await pool.connect();
      const sql = 'SELECT code FROM hall_book where hall_id=($1)';

      const result = await conn.query(sql, [hallid]);

      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Error: ${err}`);
    }
  }
}
