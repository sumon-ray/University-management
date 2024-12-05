// import { StudentModel } from "../student/student.model";
import { NextFunction, Request, Response } from "express";
import { UserServices } from "./user.service";

const createStudent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {password, student: studentData} = req.body;

    // const zodParseData = studentValidationSchema.parse(studentData);

    const result = await UserServices.createStudentIntoDB(password, studentData);

    res.status(200).json({
      success: true,
      message: "Student is created succesfully",
      data: result,
    });
  } catch (err: any) {
    next(err)

  }
};
export const UserControllers = {
  createStudent,
};
