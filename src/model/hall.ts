// @ts-ignore
import pool from '../database_connection/db';
import dotenv from 'dotenv';
import { hall, hallrate } from '../types/hall';

dotenv.config();

export class Hall {

  async index(): Promise<hall[]> {
    try {

      // @ts-ignore
      const conn = await pool.connect();
      const sql = "SELECT * FROM hall where checked='true'";

      const result = await conn.query(sql);

      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Error: ${err}`);
    }
  }

  async hallcities(): Promise<hall[]> {
    try {

      // @ts-ignore
      const conn = await pool.connect();
      const sql = "SELECT city FROM hall";

      const result = await conn.query(sql);

      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Error: ${err}`);
    }
  }

  async adminindex(): Promise<hall[]> {
    try {

      // @ts-ignore
      const conn = await pool.connect();
   
      const sql = "SELECT * FROM hall where checked='false'";

      const result = await conn.query(sql);

      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Error: ${err}`);
    }
  }

  async userindex(id: string): Promise<hall[]> {
    try {
      // @ts-ignore
      const conn = await pool.connect();
      const sql = 'SELECT * FROM hall where user_id=($1)';

      const result = await conn.query(sql, [id]);

      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Error: ${err}`);
    }
  }

  async delete(id: string): Promise<boolean> {
    try {
      const sql = 'delete FROM hall WHERE id=($1)';
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

  async update(checked: string, id: string): Promise<boolean> {
    try {
      const sql = 'UPDATE hall SET checked =$1 WHERE id =$2';
      // @ts-ignore
      const conn = await pool.connect();

      const result = await conn.query(sql, [checked, id]);
      conn.release();
      return result.rowCount === 1;
    } catch (err) {
      throw new Error(`${err}`);
    }
  }

  async create(h: hall): Promise<hall> {
    try {
      const sql =
        'INSERT INTO hall(name, capacity, city, location, details, images, cover_image,pdf,video,price_hour,user_id) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11) RETURNING *';
      // @ts-ignore
      const conn = await pool.connect();
      const result = await conn.query(sql, [
        h.name,
        h.capacity,
        h.city,
        h.location,
        h.details,
        h.images,
        h.cover_image,
        h.pdf,
        h.video,
        h.price_hour,
        h.user_id
      ]);
      const hall = result.rows[0];
      conn.release();

      return hall;
    } catch (err) {
      console.log(err);
      throw new Error(`Error ${err}`);
    }
  }

  async updateHallFields(hall: hall): Promise<boolean> {
    const { id, ...fieldsToUpdate } = hall;
    const updateColumns = Object.keys(fieldsToUpdate);
    const updateValues = Object.values(fieldsToUpdate);

    if (updateColumns.length === 0) {
      throw new Error('No fields to update provided.');
    }
    try {
      const updateSetClauses = updateColumns
        .map((column, index) => `${column} = $${index + 2}`)
        .join(', ');
      const sql = `UPDATE hall SET ${updateSetClauses} WHERE id = $1`;
      // @ts-ignore
      const conn = await pool.connect();
      const result = await conn.query(sql, [id, ...updateValues]);

      conn.release();
      return result.rowCount === 1;
    } catch (err) {
      throw new Error(`Error: ${err}`);
    }
  }

  async addRate(info:hallrate): Promise<hallrate> {
    try {
      const sql =
        'INSERT INTO hallrate (hallid,userid,rate) VALUES ($1,$2,$3) RETURNING *';
      // @ts-ignore
      const conn = await pool.connect();
      const result = await conn.query(sql, [
         info.hallid,
         info.userid,
         info.rate
      ]);
      const data = result.rows[0];
      conn.release();
      return data;
    } catch (err) {
      throw new Error(`${err}`);
    }
  }


  async CheckForUserExistRate(info:hallrate): Promise<hallrate> {
    try {
      const sql = 'select * FROM hallrate where hallid=($1) and userid=($2)';
      // @ts-ignore
      const conn = await pool.connect();
      const result = await conn.query(sql, [
        info.hallid,info.userid
      
      ]);
      const data = result.rows[0];
      conn.release();
   
      return data;
    } catch (err) {
      throw new Error(`${err}`);
    }
  }

  async getHallRate(id:number): Promise<hallrate> {
    try {
      const sql = 'select sum(rate) as sumstar,count(rate) as numstar FROM hallrate where hallid=($1)';
      // @ts-ignore
      const conn = await pool.connect();
      const result = await conn.query(sql, [id]);
      const data = result.rows[0];
      conn.release();
   
      return data;
    } catch (err) {
      throw new Error(`${err}`);
    }
  }




}
