import express from 'express';
import HallController from '../../controller/hall';
import { addhallValidator,changehallstatusValidator,checkaddrateValidator,checkfileValidator,checkhallcodesValidator,checkshowrateValidator,getuserhallsValidator } from '../../utils/validator/hallValidator';
import uploadImageController from '../../authorization/middelware/imageupload';
import verify from '../../authorization/middelware/jwtmiddelware';

const hallcontroller = new HallController();
const UploadImageController = new uploadImageController();

const hall: express.Router = express.Router();

hall.get('/', hallcontroller.index);
hall.get('/cities', hallcontroller.hallcities);
hall.get('/getadminhalls', hallcontroller.adminindex);
hall.get('/userhalls/:id',getuserhallsValidator,hallcontroller.userindex);
hall.get('/video/:filename',checkfileValidator,hallcontroller.getvideo);
hall.get('/pdf/:filename',checkfileValidator,hallcontroller.getpdf);
hall.post(
  '/addhall',
  verify,
  UploadImageController.uploadMultimages,
  addhallValidator,
  UploadImageController.resizeimage,
  hallcontroller.create
);
hall.post('/addrate', verify,checkaddrateValidator,hallcontroller.addHallRate);
hall.post('/showrate',verify,hallcontroller.checkHallShowRate);
hall.post('/hallcodes',checkhallcodesValidator,hallcontroller.gethallcodes);
hall.put('/',changehallstatusValidator,hallcontroller.update);

// unused yet
hall.post('/delete/:id', hallcontroller.delete);

export default hall;
