"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Checkout = void 0;
// @ts-ignore
const db_1 = __importDefault(require("../database_connection/db"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
class Checkout {
    async create(bookinfo) {
        try {
            const sql = 'INSERT INTO hall_book(user_id,hall_id,date,day,month,year,hour,code) VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *';
            // @ts-ignore
            const conn = await db_1.default.connect();
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
        }
        catch (err) {
            console.log(err);
            throw new Error(`Error ${err}`);
        }
    }
    async createonehour(dashboardbookinfo) {
        try {
            const sql = 'INSERT INTO hall_book_dashboard(user_id,hall_id,halluser_id,date,onehour,type,amount,secretcode) VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *';
            // @ts-ignore
            const conn = await db_1.default.connect();
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
            console.log(result, '-------------->>>>>');
            const book = result.rows[0];
            conn.release();
            return book;
        }
        catch (err) {
            console.log(err, 'osman');
            throw new Error(`Error ${err}`);
        }
    }
    async createintervalhours(dashboardbookinfo) {
        try {
            const sql = 'INSERT INTO hall_book_dashboard(user_id,hall_id,halluser_id,date,hourfrom,hourto,type,amount,secretcode) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING *';
            // @ts-ignore
            const conn = await db_1.default.connect();
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
        }
        catch (err) {
            console.log(err);
            throw new Error(`Error ${err}`);
        }
    }
    async createintervaldays(dashboardbookinfo) {
        try {
            const sql = 'INSERT INTO hall_book_dashboard(user_id,hall_id,halluser_id,datefrom,dateto,onehour,type,amount,secretcode) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING *';
            // @ts-ignore
            const conn = await db_1.default.connect();
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
        }
        catch (err) {
            console.log(err);
            throw new Error(`Error ${err}`);
        }
    }
    async createintervalhoursdays(dashboardbookinfo) {
        try {
            const sql = 'INSERT INTO hall_book_dashboard(user_id,hall_id,halluser_id,hourfrom,hourto,datefrom,dateto,type,amount,secretcode) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10) RETURNING *';
            // @ts-ignore
            const conn = await db_1.default.connect();
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
        }
        catch (err) {
            console.log(err);
            throw new Error(`Error ${err}`);
        }
    }
    async gethallcodes(hallid) {
        try {
            // @ts-ignore
            const conn = await db_1.default.connect();
            const sql = "SELECT code FROM hall_book where hall_id=($1)";
            const result = await conn.query(sql, [hallid]);
            conn.release();
            return result.rows;
        }
        catch (err) {
            throw new Error(`Error: ${err}`);
        }
    }
}
exports.Checkout = Checkout;
