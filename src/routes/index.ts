import express from 'express';
import users from './api/user';
import hall from './api/hall';
import message from './api/message';
import payment from './api/checkout';
import booking from './api/booking';
// import verify from '../authorization/middelware/jwtmiddelware';

const routes: express.Router = express.Router();

routes.use('/api/v1/users', users);
routes.use('/api/v1/halls', hall);
routes.use('/api/v1/messages',message);
routes.use('/api/v1/checkout',payment);
routes.use('/api/v1/booking',booking);

routes.get('/', (_req: express.Request, res: express.Response) => {
  res.status(200);
  res.send('this main page of routes');
});

export default routes;
