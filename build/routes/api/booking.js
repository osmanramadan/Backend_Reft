"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const booking_1 = __importDefault(require("../../controller/booking"));
// import { messageValidator } from '../../utils/validator/messageValidator';
const Bookingcontroller = new booking_1.default();
const booking = express_1.default.Router();
booking.get('/', Bookingcontroller.index);
booking.get('/teacherbooking/:id', Bookingcontroller.teacherbooking);
booking.get('/ownerbooking/:id', Bookingcontroller.ownerbooking);
exports.default = booking;
