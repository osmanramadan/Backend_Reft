import express from 'express';
import PaymentController from '../../controller/checkout';
// import { messageValidator } from '../../utils/validator/messageValidator';

const Paycontroller = new PaymentController();
const payment: express.Router = express.Router();

payment.post("/createorder" , Paycontroller.createOrder)
payment.post("/capturepayment" , Paycontroller.captureorder)
payment.post("/hallcodes" , Paycontroller.gethallcodes)



export default payment;
