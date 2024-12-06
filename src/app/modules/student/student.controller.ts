import {  Request, Response } from "express";
import { StudentServices } from "./student.service";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";



// higher order function


const getAllStudents = catchAsync(
  async (req: Request, res: Response) => {
    const result = await StudentServices.getAllStudentsFromDB();

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Students are retrieved succesfully",
      data: result,
    });
    // res.status(200).json({
    //   success: true,
    //   message: "Students are retrieved succesfully",
    //   data: result,
    // });
  }
);

const getSingleStudent = catchAsync(
  async (req: Request, res: Response) => {
    const { studentId } = req.params;

    const result = await StudentServices.getSingleStudentFromDB(studentId);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Student is retrieved succesfully",
      data: result,
    });
  }
);

const deleteStudentFromDB = catchAsync(
  async (req: Request, res: Response) => {
    const { studentId } = req.params;

    const result = await StudentServices.deleteStudentFromDB(studentId);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Student is deleted succesfully",
      data: result,
    });
  }
);

export const StudentControllers = {
  // createStudent,
  getAllStudents,
  getSingleStudent,
  deleteStudentFromDB,
};
