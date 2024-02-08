import { Hall } from '../model/hall';
import { hall } from '../types/hall';
import { Request, Response } from 'express';

const hallobject = new Hall();

export default class HallController {
    
  index = async (_req: Request, res: Response) => {
    try {
      const halls = await hallobject.index();
      if (halls) {
        res.json(halls);
        return;
      }
    } catch (err) {
      res.status(400);
      res.json({ status: 'fail' });
      return;
    }
  };

  delete = async (req: Request, res: Response) => {
    try {
      
      const deleted = await hallobject.delete(req.params.id);

      if(deleted){
        res.json({ status: 'success' });
        return;
      }

    } catch (err) {
        console.log(err)
      res.status(400);
      res.json({ status: 'fail' });
      return;
    }
  };

  create = async (req: Request, res: Response) => {
    try {
      const hall: hall = {
        name: req.body.name,
        capacity: req.body.capacity,
        city: req.body.city,
        location: req.body.location,
        details: req.body.details,
        images: req.body.images,
        cover_image: req.body.cover_image,
        pdf: req.body.pdf,
        video: req.body.video,
        user_id: req.body.user_id
      };

      const newhall = await hallobject.create(hall);
      if (newhall) {
        res.json({ status: 'success', data: newhall });
        return;
      }
      res.json({ status: 'fail' });
      return;
    } catch (err) {
      res.status(400);
      console.log(err)
      res.json({ status: 'fail' });
      return;
    }
  };

  update = async (req: Request, res: Response) => {
    try {
      const hall: hall = {
        id:req.body.id,
        name: req.body.name,
        capacity: req.body.capacity,
        city: req.body.city,
        location: req.body.location,
        details: req.body.details,
        images: req.body.images,
        cover_image: req.body.cover_image,
        pdf: req.body.pdf,
        video: req.body.video,
        user_id: req.body.user_id
      };

      const updated = await hallobject.updateHallFields(hall);
      if (updated) {
        res.json({ status: 'success' });
        return;
      }
      res.json({ status: 'fail' });
      return;
    } catch (err) {
      res.status(400);
      res.json({ status: 'fail' });
      return;
    }
  };
}
