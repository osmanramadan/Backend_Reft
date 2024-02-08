// @ts-ignore
import pool from '../database_connection/db';
import dotenv from 'dotenv';
import { hall } from '../types/hall';

dotenv.config();

export class Hall {
  async index(): Promise<hall[]> {
    try {
      // @ts-ignore
      const conn = await pool.connect();
      const sql = 'SELECT * FROM hall';

      const result = await conn.query(sql);

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
      if(result.rowCount){
        return true;
      }
      return false;

    } catch (err) {
      throw new Error(`${err}`);
    }
  }

  async create(h: hall): Promise<hall> {
    try {
      const sql =
        'INSERT INTO hall(name, capacity, city, location, details, images, cover_image, pdf, video, user_id) VALUES ($1, $2,$3,$4,$5,$6,$7,$8,$9,$10) RETURNING *';
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
        h.user_id
      ]);
      const hall = result.rows[0];
      conn.release();

      return hall;
    } catch (err) {
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
}
