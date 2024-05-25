import { Request, Response } from 'express';
import { createOrder, capturePayment } from '../payment/paypal';
import { Checkout } from '../model/checkout';
import { bookinfo } from '../types/bookinfo';



const checkout =new Checkout()

export default class PaymentController {



createOrder= async (req: Request, res: Response) => {
    try {

       const [token,url] = await createOrder(String(req.body.amount))
       res.status(200).json({'status':'success','url':url,'token':token})
       return;
    } catch (err) {
      res.status(400);
      res.json({ status: 'fail' });
      return;
    }
  };

captureorder = async (req: Request, res: Response) => {
    try {
      // console.log(req.body.data:bookinfo)
      await capturePayment(req.query.token)

     console.log(req.body.data.type)
      if(req.body.data.type=='onehour'){

       const bookinfo:bookinfo ={
        userid:req.body.data.userid,
        hallid:req.body.data.hallid,
        date:req.body.data.date,
        day:req.body.data.day,
        hour:req.body.data.hour,
        year:req.body.data.year,
        month:req.body.data.month,
        code: `${req.body.data.hallid}${req.body.data.year}${req.body.data.month}${req.body.data.day}${req.body.data.hour}`
     }

      const check = await checkout.create(bookinfo)
      if(check){
        res.json({'status':'success'})
        return;
      }
      }else if(req.body.data.type=='hourdays'||req.body.data.type=='dayshours'||req.body.data.type=='dayhours'){
        
         try{

            req.body.data.bookinfo.map((e:bookinfo)=>{

            const bookinfo:bookinfo ={
              userid:e.userid,
              hallid:e.hallid,
              date:e.date,
              day:e.day,
              hour:e.hour,
              year:e.year,
              month:e.month,
              code:e.code
           }
             checkout.create(bookinfo)
  
          })
          res.json({'status':'success'})
          return;
         }catch(e){
                 
            res.json({'status':'fail'})
            return;
         }
        
      }else{
        res.json({'status':'fail'})
        return;
      }

      
               


    } catch (err) {
      res.status(400);
      res.json({ 'status': 'fail' });
      return;
    }
}

gethallcodes= async (req: Request, res: Response) => {
  try {

 
   console.log(req.body.id)
     const codes =await checkout.gethallcodes(req.body.id)
     res.status(200).json({'status':'success','codes':codes.map((e:any)=>{return e.code})})
     return;
  } catch (err) {
    res.status(400);
    res.json({ status: 'fail' });
    return;
  }
};


}






