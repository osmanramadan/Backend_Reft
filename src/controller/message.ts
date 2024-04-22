import { Message } from '../model/message';
import { Request, Response } from 'express';
import { message } from '../types/message';

const messageobject = new Message();

export default class MessageController {
  index = async (_req: Request, res: Response) => {
    try {
      const messages = await messageobject.index();
      if (messages) {
        res.json({data:messages,status:"success"});
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

  delete = async (req: Request, res: Response) => {
    try {
      const deleted = await messageobject.delete(req.params.id);

      if (deleted) {
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

  create = async (req: Request, res: Response) => {
    try {
      const message: message = {
        name: req.body.name,
        phone: req.body.phone,
        email: req.body.email,
        message: req.body.message,
        user_id: req.body.user_id
      };

      const newmessage = await messageobject.create(message);
      if (newmessage) {
        res.json({ status: 'success', data: newmessage });
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
