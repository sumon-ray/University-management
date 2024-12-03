// import httpStatus from 'http-status';

import { NextFunction, Request, Response } from "express";
import sendResponse from "../../utils/sendResponse";
import { UserServices } from "./user.service";

const createStudent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { password, student: studentData } = req.body;

    // const zodParsedData = studentValidationSchema.parse(studentData);

    const result = await UserServices.createStudentIntoDB(
      password,
      studentData,
    );

    sendResponse(res, {
      //   statusCode: httpStatus.OK
      statusCode: 200,
      success: true,
      message: "Student is created succesfully",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

export const UserControllers = {
  createStudent,
};
