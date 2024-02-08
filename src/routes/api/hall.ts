import express from 'express';
import HallController from '../../controller/hall';
import verify from '../../authorization/middelware/jwtmiddelware';

const hallcontroller = new HallController();
const hall: express.Router = express.Router();

hall.get('/', hallcontroller.index);
hall.post('/add', hallcontroller.create);
hall.post('/delete/:id', hallcontroller.delete);
hall.put('/update', hallcontroller.update);

export default hall;
