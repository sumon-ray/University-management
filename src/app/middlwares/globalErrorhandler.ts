// import { NextFunction, Request, Response } from "express";

import { NextFunction, Request, Response } from "express";

// const globalErrorHandler = (
//   err: any,
//   req: Request,
//   res: Response,
//   next: NextFunction,
// ) => {
//   const statusCode = 500;
//   const message = err.message || "Something Went wrong";

//   return res.status(statusCode).json({
//     success: false,
//     message,
//     error: err,
//   });
// };

// export default globalErrorHandler;


const globalErrorHandler =  (err:any, req: Request, res:Response, next: NextFunction)=>{
  const statusCode = 500 ;
  const message= err.message || "something went wrong"

  res.status(statusCode).json({
    success:false,
     message,
     error: err
  })
 
  next()
}


export default globalErrorHandler