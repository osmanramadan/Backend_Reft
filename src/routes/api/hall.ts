import express from 'express';
import HallController from '../../controller/hall';
// import verify from '../../authorization/middelware/jwtmiddelware';
import { addhallValidator } from '../../utils/validator/hallValidator';
import uploadImageController from '../../authorization/middelware/imageupload';
// import verify from '../../authorization/middelware/jwtmiddelware';

const hallcontroller = new HallController();
const UploadImageController = new uploadImageController();

const hall: express.Router = express.Router();

hall.get('/',hallcontroller.index);
hall.get('/getadminhalls', hallcontroller.adminindex);
hall.get('/:id', hallcontroller.userindex);
hall.get('/video/:filename', hallcontroller.getvideo);
hall.get('/pdf/:filename', hallcontroller.getpdf);
hall.post(
  '/addhall',
  UploadImageController.uploadMultimages,
  UploadImageController.resizeimage,
  addhallValidator,
  hallcontroller.create
);
hall.post('/delete/:id', hallcontroller.delete);
hall.put('/', hallcontroller.update);

export default hall;
