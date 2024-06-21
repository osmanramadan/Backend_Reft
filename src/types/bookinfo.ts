export type bookinfo = {
    id?: number;
    userid?: number;
    halluserid?:number;
    hallid?:number;
    date?:Date;
    day?:number;
    month?:number;
    year?:number;
    hour?:string;
    code?:string;
  };

  export type dashboardbookinfo = {
    id?: number;
    userid?: number;
    halluserid?:number;
    hallid?:number;
    hall_id?:number;
    datefrom?:Date;
    dateto?:Date;
    hourfrom?:string;
    hourto?:string;
    date?:Date;
    hour?:string;
    type?:string;
    amount?:string;
    hallinfo?:any;
    userbyid?:any;
    bookinglist?:any;
    placeownerbyid?:any;
    secretcode?:any;


  };
  