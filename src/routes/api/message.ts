import express from 'express';
import MessageController from '../../controller/message';
import { createmessageValidator, deleteValidator,  } from '../../utils/validator/messageValidator';

const messagecontroller = new MessageController();
const message: express.Router = express.Router();

message.get('/', messagecontroller.index);
message.post('/',createmessageValidator ,messagecontroller.create);
message.post('/delete/:id',deleteValidator,messagecontroller.delete);

export default message;
