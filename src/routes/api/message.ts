import express from 'express';
// import verify from '../../authorization/middelware/jwtmiddelware';
import MessageController from '../../controller/message';


const messagecontroller = new MessageController();
const message: express.Router = express.Router();

message.get('/'           , messagecontroller.index);
message.post('/add'       , messagecontroller.create);
message.post('/delete/:id', messagecontroller.delete);


export default message;
