"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const TOKEN_SECRET = process.env.TOKEN_SECRET;
let x = 0;
const verify = async (req, res, next) => {
    try {
        const authorizationHeader = req.headers.authorization;
        const token = authorizationHeader.split(' ')[1];
        const decoded = jsonwebtoken_1.default.verify(token, TOKEN_SECRET);
        x++;
        console.log(x);
        // @ts-ignore
        req.userid = decoded.userid;
        next();
    }
    catch (_a) {
        res.status(401);
        res.json({ status: 'forbidden' });
    }
};
exports.default = verify;
