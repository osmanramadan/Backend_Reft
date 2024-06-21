"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const booking_1 = require("../model/booking");
const hall_1 = require("../model/hall");
const user_1 = require("../model/user");
const bookingobject = new booking_1.Booking();
const hallobject = new hall_1.Hall();
const userobject = new user_1.User();
class BookingController {
    constructor() {
        this.index = async (_req, res) => {
            try {
                const bookinfo = await bookingobject.index();
                let data = [];
                for (const bookinglist of bookinfo) {
                    const hallbyid = await hallobject.gethallbyid(bookinglist.hall_id);
                    const userbyid = await userobject.show(bookinglist.user_id);
                    const placeownerbyid = await userobject.show(bookinglist.halluser_id);
                    if (hallbyid) {
                        data.push({ hallinfo: hallbyid, bookinglist, userbyid, placeownerbyid });
                    }
                }
                if (data) {
                    res.json({ data: data, status: "success" });
                    return;
                }
                res.json({ status: 'fail' });
                return;
            }
            catch (err) {
                res.status(400);
                res.json({ status: 'fail' });
                return;
            }
        };
        this.teacherbooking = async (req, res) => {
            try {
                const bookinfo = await bookingobject.teacherbooking(req.params.id);
                let data = [];
                for (const bookinglist of bookinfo) {
                    const hallbyid = await hallobject.gethallbyid(bookinglist.hall_id);
                    const userbyid = await userobject.show(bookinglist.user_id);
                    const placeownerbyid = await userobject.show(bookinglist.halluser_id);
                    if (hallbyid) {
                        data.push({ hallinfo: hallbyid, bookinglist, userbyid, placeownerbyid });
                    }
                }
                if (data) {
                    res.json({ data: data, status: "success" });
                    return;
                }
                res.json({ status: 'fail' });
                return;
            }
            catch (err) {
                res.status(400);
                res.json({ status: 'fail' });
                return;
            }
        };
        this.ownerbooking = async (req, res) => {
            try {
                const bookinfo = await bookingobject.ownerbooking(req.params.id);
                let data = [];
                for (const bookinglist of bookinfo) {
                    const hallbyid = await hallobject.gethallbyid(bookinglist.hall_id);
                    const userbyid = await userobject.show(bookinglist.user_id);
                    const placeownerbyid = await userobject.show(bookinglist.halluser_id);
                    if (hallbyid) {
                        data.push({ hallinfo: hallbyid, bookinglist, userbyid, placeownerbyid });
                    }
                }
                if (data) {
                    res.json({ data: data, status: "success" });
                    return;
                }
                res.json({ status: 'fail' });
                return;
            }
            catch (err) {
                res.status(400);
                res.json({ status: 'fail' });
                return;
            }
        };
        //   delete = async (req: Request, res: Response) => {
        //     try {
        //       const deleted = await messageobject.delete(req.params.id);
        //       if (deleted) {
        //         res.json({ status: 'success' });
        //         return;
        //       }
        //       res.json({ status: 'fail' });
        //       return;
        //     } catch (err) {
        //       res.status(400);
        //       res.json({ status: 'fail' });
        //       return;
        //     }
        //   };
        //   create = async (req: Request, res: Response) => {
        //     try {
        //       const message: message = {
        //         name: req.body.name,
        //         phone: req.body.phone,
        //         email: req.body.email,
        //         message: req.body.message,
        //         user_id: req.body.user_id
        //       };
        //       const newmessage = await messageobject.create(message);
        //       if (newmessage) {
        //         res.json({ status: 'success', data: newmessage });
        //         return;
        //       }
        //       res.json({ status: 'fail' });
        //       return;
        //     } catch (err) {
        //       res.status(400);
        //       res.json({ status: 'fail' });
        //       return;
        //     }
        //   };
    }
}
exports.default = BookingController;
