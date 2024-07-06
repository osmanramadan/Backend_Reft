import express from 'express';
import Usercontroller from '../../controller/user';
import verify from '../../authorization/middelware/jwtmiddelware';

import {
  signupValidator,
  loginValidator,
  forgetPasswordValidator,
  verifyPasswordValidator,
  resetPasswordValidator
} from '../../utils/validator/authValidator';

const usercontroller = new Usercontroller();
const users: express.Router = express.Router();

users.get('/',usercontroller.index);
users.post('/signup', usercontroller.create);
users.post('/login',usercontroller.getuserbycredentials);
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
users.put('/updateuserprofile',verify,usercontroller.updateuserprofile);
users.put('/updateuserpassword', usercontroller.updateuserpassword);

users.get('/verifyuser',verify,usercontroller.showuserbytoken);
// users.delete('/delete/:id', verify, usercontroller.delete);

export default users;
