// import { NextFunction, Request, Response } from "express";

import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import { ZodError, ZodIssue } from "zod";
import config from "../config";
import handleZodError from "../errors/handleZodError";
import { TErrorSources } from "../interface/error";
import handleValidationError from "../errors/handleValidationError";
import handleCastError from "../errors/handleCastError";

const globalErrorHandler: ErrorRequestHandler =  (err, req, res, next)=>{
  let statusCode = err.statusCode || 500 ;
  let message= err.message || "something went wrong";


  let errorSources : TErrorSources = [
    {
      path: '' , 
      message: 'something went wrong'
    }
  ]




// checking for zod error or not
  if (err instanceof ZodError) {
    const simplifiedError = handleZodError(err)
    console.log(simplifiedError)
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError.message;
    errorSources = simplifiedError?.errorSources;

  } else if(err?.name === 'ValidationError'){
    // console.log("moongoose error")
    const simplifiedError = handleValidationError(err)
    statusCode = simplifiedError?.statusCode 
    message = simplifiedError?.message
    errorSources = simplifiedError?.errorSources
  }else if (err?.name === 'CastError'){
   const simplifiedError = handleCastError(err)
   statusCode = simplifiedError?.statusCode
   message = simplifiedError?.message 
   errorSources = simplifiedError?.errorSources
  }



  res.status(statusCode).json({
    success:false,
     message,
     errorSources,
    //  err,
     stack: config.NODE_ENV === 'development'? err.stack : null
  })
 
}


export default globalErrorHandler