import express from 'express';
import  BookingController from '../../controller/booking';
// import { messageValidator } from '../../utils/validator/messageValidator';

const Bookingcontroller = new BookingController();
const booking: express.Router = express.Router();


booking.get("/" , Bookingcontroller.index)
booking.get("/teacherbooking/:id" , Bookingcontroller.teacherbooking)
booking.get("/ownerbooking/:id" , Bookingcontroller.ownerbooking)




export default booking;