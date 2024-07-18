import express from 'express';
import Usercontroller from '../../controller/user';
import verify from '../../authorization/middelware/jwtmiddelware';

import {
  loginValidator,
  signupValidator,
  forgetPasswordValidator,
  verifyPasswordValidator,
  resetPasswordValidator

} from '../../utils/validator/authValidator';

const usercontroller = new Usercontroller();
const users: express.Router = express.Router();

users.get('/',verify,usercontroller.index);
users.post('/signup',signupValidator,usercontroller.create);
users.post('/login',loginValidator,usercontroller.getuserbycredentials);
users.post(
  '/forgotPassword',
  forgetPasswordValidator,
  usercontroller.forgetpassword
);
users.post(
  '/verifyResetCode',
  verifyPasswordValidator,
  usercontroller.verifyresetcode
);
users.post(
  '/resetPassword',
  resetPasswordValidator,
  usercontroller.resetpassword
);
// unused yet
users.put('/updateuserprofile', verify, usercontroller.updateuserprofile);
users.put('/updateuserpassword', usercontroller.updateuserpassword);

users.get('/verifyuser', verify, usercontroller.showuserbytoken);

export default users;
