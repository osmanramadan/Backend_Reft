"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Hall = void 0;
// @ts-ignore
const db_1 = __importDefault(require("../database_connection/db"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
class Hall {
    async index() {
        try {
            // @ts-ignore
            const conn = await db_1.default.connect();
            const sql = "SELECT * FROM hall where checked='true'";
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        }
        catch (err) {
            throw new Error(`Error: ${err}`);
        }
    }
    async adminindex() {
        try {
            // @ts-ignore
            const conn = await db_1.default.connect();
            const sql = "SELECT * FROM hall where checked='false'";
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        }
        catch (err) {
            throw new Error(`Error: ${err}`);
        }
    }
    async userindex(id) {
        try {
            // @ts-ignore
            const conn = await db_1.default.connect();
            const sql = 'SELECT * FROM hall where user_id=($1)';
            const result = await conn.query(sql, [id]);
            conn.release();
            return result.rows;
        }
        catch (err) {
            throw new Error(`Error: ${err}`);
        }
    }
    async delete(id) {
        try {
            const sql = 'delete FROM hall WHERE id=($1)';
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
    async update(checked, id) {
        try {
            const sql = 'UPDATE hall SET checked =$1 WHERE id =$2';
            // @ts-ignore
            const conn = await db_1.default.connect();
            const result = await conn.query(sql, [checked, id]);
            conn.release();
            return result.rowCount === 1;
        }
        catch (err) {
            throw new Error(`${err}`);
        }
    }
    async create(h) {
        try {
            const sql = 'INSERT INTO hall(name, capacity, city, location, details, images, cover_image,pdf,video,price_hour,user_id) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11) RETURNING *';
            // @ts-ignore
            const conn = await db_1.default.connect();
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
        }
        catch (err) {
            console.log(err);
            throw new Error(`Error ${err}`);
        }
    }
    async updateHallFields(hall) {
        const { id } = hall, fieldsToUpdate = __rest(hall, ["id"]);
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
            const conn = await db_1.default.connect();
            const result = await conn.query(sql, [id, ...updateValues]);
            conn.release();
            return result.rowCount === 1;
        }
        catch (err) {
            throw new Error(`Error: ${err}`);
        }
    }
}
exports.Hall = Hall;
