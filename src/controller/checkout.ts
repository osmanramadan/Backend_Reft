import { Request, Response } from 'express';
import { createOrder, capturePayment } from '../payment/paypal';
import { createOrderByStripe, capturePaymentStipe } from '../payment/stripe';
import { Checkout } from '../model/checkout';
import { bookinfo, dashboardbookinfo } from '../types/bookinfo';


const checkout = new Checkout();

export default class PaymentController {

  createOrderPaypal = async (req: Request, res: Response) => {
    try {
      const [token, url] = await createOrder(req.body.amount);

      res.status(200).json({ status: 'success', url: url, token: token });
      return;
    } catch (err) {
      res.status(400);
      res.json({ status: 'fail',message:err });
      return;
    }
  };

  createOrderStripe = async (req: Request, res: Response) => {
    try {
      const url = await createOrderByStripe(req.body.amount);
      res.status(200).json({ status: 'success', url: url });
      return;
    } catch (err) {
      res.status(400);
      res.json({ status: 'fail',message:err });
      return;
    }
  };

  captureorderstripe = async (req: Request, res: Response) => {
    try {
      await capturePaymentStipe(req.query.sessionid);

      function generateNumericSecretCode(length: number = 10): string {
        const charset = '0123456789*#$@%!';
        const values = new Uint32Array(length);
        crypto.getRandomValues(values);

        let secretCode = '';
        for (let i = 0; i < length; i++) {
          secretCode += charset[values[i] % charset.length];
        }

        return secretCode;
      }

      if (req.body.data.type == 'onehour') {
        const dashboardbookdata: dashboardbookinfo = {
          userid: req.body.data.dashboardinfo.userid,
          halluserid: req.body.data.dashboardinfo.halluserid,
          hallid: req.body.data.dashboardinfo.hallid,
          date: req.body.data.dashboardinfo.date,
          hour: req.body.data.dashboardinfo.hour,
          type: req.body.data.dashboardinfo.type,
          amount: req.body.data.dashboardinfo.amount,
          secretcode: generateNumericSecretCode()
        };

        await checkout.createonehour(dashboardbookdata);

        const bookinfo: bookinfo = {
          userid: req.body.data.userid,
          hallid: req.body.data.hallid,
          date: req.body.data.date,
          day: req.body.data.day,
          hour: req.body.data.hour,
          year: req.body.data.year,
          month: req.body.data.month,
          code: `${req.body.data.hallid}${req.body.data.year}${req.body.data.month}${req.body.data.day}${req.body.data.hour}`
        };

        const check = await checkout.create(bookinfo);

        if (check) {
          res.json({ status: 'success' });
          return;
        }
      } else if (req.body.data.type == 'hourdays') {
        try {
          const dashboardbookdata: dashboardbookinfo = {
            userid: req.body.data.dashboardinfo.userid,
            halluserid: req.body.data.dashboardinfo.halluserid,
            hallid: req.body.data.dashboardinfo.hallid,
            datefrom: req.body.data.dashboardinfo.datefrom,
            dateto: req.body.data.dashboardinfo.dateto,
            hour: req.body.data.dashboardinfo.hour,
            type: req.body.data.dashboardinfo.type,
            amount: req.body.data.dashboardinfo.amount,
            secretcode: generateNumericSecretCode()
          };
          await checkout.createintervaldays(dashboardbookdata);

          req.body.data.bookinfo.map((e: bookinfo) => {
            const bookinfo: bookinfo = {
              userid: e.userid,
              hallid: e.hallid,
              date: e.date,
              day: e.day,
              hour: e.hour,
              year: e.year,
              month: e.month,
              code: e.code
            };
            checkout.create(bookinfo);
          });
          res.json({ status: 'success' });
          return;
        } catch (e) {
          res.json({ status: 'fail' });
          return;
        }
      } else if (req.body.data.type == 'dayshours') {
        try {
          const dashboardbookdata: dashboardbookinfo = {
            userid: req.body.data.dashboardinfo.userid,
            halluserid: req.body.data.dashboardinfo.halluserid,
            hallid: req.body.data.dashboardinfo.hallid,
            datefrom: req.body.data.dashboardinfo.datefrom,
            dateto: req.body.data.dashboardinfo.dateto,
            hourfrom: req.body.data.dashboardinfo.hourfrom,
            hourto: req.body.data.dashboardinfo.hourto,
            type: req.body.data.dashboardinfo.type,
            amount: req.body.data.dashboardinfo.amount,
            secretcode: generateNumericSecretCode()
          };
          checkout.createintervalhoursdays(dashboardbookdata);

          req.body.data.bookinfo.map((e: bookinfo) => {
            const bookinfo: bookinfo = {
              userid: e.userid,
              hallid: e.hallid,
              date: e.date,
              day: e.day,
              hour: e.hour,
              year: e.year,
              month: e.month,
              code: e.code
            };
            checkout.create(bookinfo);
          });
          res.json({ status: 'success' });
          return;
        } catch (e) {
          res.json({ status: 'fail' });
          return;
        }
      } else if (req.body.data.type == 'dayhours') {
        try {
          const dashboardbookdata: dashboardbookinfo = {
            userid: req.body.data.dashboardinfo.userid,
            halluserid: req.body.data.dashboardinfo.halluserid,
            hallid: req.body.data.dashboardinfo.hallid,
            date: req.body.data.dashboardinfo.date,
            hourfrom: req.body.data.dashboardinfo.hourfrom,
            hourto: req.body.data.dashboardinfo.hourto,
            type: req.body.data.dashboardinfo.type,
            amount: req.body.data.dashboardinfo.amount,
            secretcode: generateNumericSecretCode()
          };
          checkout.createintervalhours(dashboardbookdata);

          req.body.data.bookinfo.map((e: bookinfo) => {
            const bookinfo: bookinfo = {
              userid: e.userid,
              hallid: e.hallid,
              date: e.date,
              day: e.day,
              hour: e.hour,
              year: e.year,
              month: e.month,
              code: e.code
            };
            checkout.create(bookinfo);
          });
          res.json({ status: 'success' });
          return;
        } catch (e) {
          res.json({ status: 'fail' });
          return;
        }
      } else {
        res.json({ status: 'fail' });
        return;
      }
    } catch (e) {
      res.status(400);
      res.json({ status: 'fail',message:e });
      return;
    }
  };

  captureorderpaypal = async (req: Request, res: Response) => {
    try {
      await capturePayment(req.query.sessionid);

      function generateNumericSecretCode(length: number = 10): string {
        const charset = '0123456789*#$@%!';
        const values = new Uint32Array(length);
        crypto.getRandomValues(values);

        let secretCode = '';
        for (let i = 0; i < length; i++) {
          secretCode += charset[values[i] % charset.length];
        }

        return secretCode;
      }

      if (req.body.data.type == 'onehour') {
        const dashboardbookdata: dashboardbookinfo = {
          userid: req.body.data.dashboardinfo.userid,
          halluserid: req.body.data.dashboardinfo.halluserid,
          hallid: req.body.data.dashboardinfo.hallid,
          date: req.body.data.dashboardinfo.date,
          hour: req.body.data.dashboardinfo.hour,
          type: req.body.data.dashboardinfo.type,
          amount: req.body.data.dashboardinfo.amount,
          secretcode: generateNumericSecretCode()
        };

        await checkout.createonehour(dashboardbookdata);

        const bookinfo: bookinfo = {
          userid: req.body.data.userid,
          hallid: req.body.data.hallid,
          date: req.body.data.date,
          day: req.body.data.day,
          hour: req.body.data.hour,
          year: req.body.data.year,
          month: req.body.data.month,
          code: `${req.body.data.hallid}${req.body.data.year}${req.body.data.month}${req.body.data.day}${req.body.data.hour}`
        };

        const check = await checkout.create(bookinfo);

        if (check) {
          res.json({ status: 'success' });
          return;
        }
      } else if (req.body.data.type == 'hourdays') {
        try {
          const dashboardbookdata: dashboardbookinfo = {
            userid: req.body.data.dashboardinfo.userid,
            halluserid: req.body.data.dashboardinfo.halluserid,
            hallid: req.body.data.dashboardinfo.hallid,
            datefrom: req.body.data.dashboardinfo.datefrom,
            dateto: req.body.data.dashboardinfo.dateto,
            hour: req.body.data.dashboardinfo.hour,
            type: req.body.data.dashboardinfo.type,
            amount: req.body.data.dashboardinfo.amount,
            secretcode: generateNumericSecretCode()
          };
          await checkout.createintervaldays(dashboardbookdata);

          req.body.data.bookinfo.map((e: bookinfo) => {
            const bookinfo: bookinfo = {
              userid: e.userid,
              hallid: e.hallid,
              date: e.date,
              day: e.day,
              hour: e.hour,
              year: e.year,
              month: e.month,
              code: e.code
            };
            checkout.create(bookinfo);
          });
          res.json({ status: 'success' });
          return;
        } catch (e) {
          res.json({ status: 'fail' });
          return;
        }
      } else if (req.body.data.type == 'dayshours') {
        try {
          const dashboardbookdata: dashboardbookinfo = {
            userid: req.body.data.dashboardinfo.userid,
            halluserid: req.body.data.dashboardinfo.halluserid,
            hallid: req.body.data.dashboardinfo.hallid,
            datefrom: req.body.data.dashboardinfo.datefrom,
            dateto: req.body.data.dashboardinfo.dateto,
            hourfrom: req.body.data.dashboardinfo.hourfrom,
            hourto: req.body.data.dashboardinfo.hourto,
            type: req.body.data.dashboardinfo.type,
            amount: req.body.data.dashboardinfo.amount,
            secretcode: generateNumericSecretCode()
          };
          checkout.createintervalhoursdays(dashboardbookdata);

          req.body.data.bookinfo.map((e: bookinfo) => {
            const bookinfo: bookinfo = {
              userid: e.userid,
              hallid: e.hallid,
              date: e.date,
              day: e.day,
              hour: e.hour,
              year: e.year,
              month: e.month,
              code: e.code
            };
            checkout.create(bookinfo);
          });
          res.json({ status: 'success' });
          return;
        } catch (e) {
          res.json({ status: 'fail' });
          return;
        }
      } else if (req.body.data.type == 'dayhours') {
        try {
          const dashboardbookdata: dashboardbookinfo = {
            userid: req.body.data.dashboardinfo.userid,
            halluserid: req.body.data.dashboardinfo.halluserid,
            hallid: req.body.data.dashboardinfo.hallid,
            date: req.body.data.dashboardinfo.date,
            hourfrom: req.body.data.dashboardinfo.hourfrom,
            hourto: req.body.data.dashboardinfo.hourto,
            type: req.body.data.dashboardinfo.type,
            amount: req.body.data.dashboardinfo.amount,
            secretcode: generateNumericSecretCode()
          };
          checkout.createintervalhours(dashboardbookdata);

          req.body.data.bookinfo.map((e: bookinfo) => {
            const bookinfo: bookinfo = {
              userid: e.userid,
              hallid: e.hallid,
              date: e.date,
              day: e.day,
              hour: e.hour,
              year: e.year,
              month: e.month,
              code: e.code
            };
            checkout.create(bookinfo);
          });
          res.json({ status: 'success' });
          return;
        } catch (e) {
          res.json({ status: 'fail' });
          return;
        }
      } else {
        res.json({ status: 'fail' });
        return;
      }
    } catch (err) {
      res.status(400);
      res.json({ status: 'fail' });
      return;
    }
  };

 
}
