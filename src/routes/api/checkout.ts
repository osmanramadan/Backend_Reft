import express from 'express';
import PaymentController from '../../controller/checkout';
import { chechoutcaptureorderValidator, chechoutcreateorderValidator } from '../../utils/validator/checkoutValidator';


const Paycontroller = new PaymentController();
const payment: express.Router = express.Router();

payment.post('/createorderpaypal',chechoutcreateorderValidator,Paycontroller.createOrderPaypal);
payment.post('/createorderstripe',chechoutcreateorderValidator,Paycontroller.createOrderStripe);
payment.post('/capturepaymentpaypal',chechoutcaptureorderValidator,Paycontroller.captureorderpaypal);
payment.post('/capturepaymentstripe',chechoutcaptureorderValidator,Paycontroller.captureorderstripe);


export default payment;
