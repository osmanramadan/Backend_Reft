import express from 'express';
import PaymentController from '../../controller/checkout';
// import { messageValidator } from '../../utils/validator/messageValidator';

const Paycontroller = new PaymentController();
const payment: express.Router = express.Router();


payment.post('/createorderpaypal',    Paycontroller.createOrderPaypal);
payment.post('/createorderstripe',    Paycontroller.createOrderStripe);
payment.post('/capturepaymentpaypal', Paycontroller.captureorderpaypal);
payment.post('/capturepaymentstripe', Paycontroller.captureorderstripe);
payment.post('/hallcodes',            Paycontroller.gethallcodes);

export default payment;
