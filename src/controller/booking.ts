import { Booking } from '../model/booking';
import { Request, Response } from 'express';
import { dashboardbookinfo } from '../types/bookinfo';
import { Hall } from '../model/hall';
import { User } from '../model/user';

const bookingobject = new Booking();

const hallobject = new Hall();
const userobject = new User();

export default class BookingController {
  index = async (_req: Request, res: Response) => {
    try {
      const bookinfo: any = await bookingobject.index();
      let data: dashboardbookinfo[] = [];

      for (const bookinglist of bookinfo) {
        const hallbyid = await hallobject.gethallbyid(
          bookinglist.hall_id as string
        );
        const userbyid = await userobject.show(bookinglist.user_id as number);
        const placeownerbyid = await userobject.show(
          bookinglist.halluser_id as number
        );

        if (hallbyid) {
          data.push({
            hallinfo: hallbyid,
            bookinglist,
            userbyid,
            placeownerbyid
          });
        }
      }

      if (data) {
        res.json({ data: data, status: 'success' });
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

  teacherbooking = async (req: Request, res: Response) => {
    try {
      const bookinfo: any = await bookingobject.teacherbooking(req.params.id);
      let data: dashboardbookinfo[] = [];

      for (const bookinglist of bookinfo) {
        const hallbyid = await hallobject.gethallbyid(
          bookinglist.hall_id as string
        );
        const userbyid = await userobject.show(bookinglist.user_id as number);
        const placeownerbyid = await userobject.show(
          bookinglist.halluser_id as number
        );

        if (hallbyid) {
          data.push({
            hallinfo: hallbyid,
            bookinglist,
            userbyid,
            placeownerbyid
          });
        }
      }

      if (data) {
        res.json({ data: [...new Set(data)], status: 'success' });
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

  ownerbooking = async (req: Request, res: Response) => {
    try {
      console.log(req.params.id)
      const bookinfo: any = await bookingobject.ownerbooking(req.params.id);
      let data: dashboardbookinfo[] = [];

      for (const bookinglist of bookinfo) {
        const hallbyid = await hallobject.gethallbyid(
          bookinglist.hall_id as string
        );
        const userbyid = await userobject.show(bookinglist.user_id as number);
        const placeownerbyid = await userobject.show(
          bookinglist.halluser_id as number
        );

        if (hallbyid) {
          data.push({
            hallinfo: hallbyid,
            bookinglist,
            userbyid,
            placeownerbyid
          });
        }
      }
      console.log(data,'****************************')       
      if (data) {
        res.json({ data: data, status: 'success' });
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
