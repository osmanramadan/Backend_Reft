import express from 'express';
import BookingController from '../../controller/booking';
import { bookValidator } from '../../utils/validator/bookValidator';
// import { messageValidator } from '../../utils/validator/messageValidator';

const Bookingcontroller = new BookingController();
const booking: express.Router = express.Router();

booking.get('/', Bookingcontroller.index);
booking.get('/teacherbooking/:id',bookValidator,Bookingcontroller.teacherbooking);
booking.get('/ownerbooking/:id',bookValidator,Bookingcontroller.ownerbooking);

export default booking;
