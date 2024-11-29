import { Request, Response } from "express";
import { studentService } from "./student.service";

const createStudent = async (req: Request, res: Response) => {
  try {
    const {student:studentData} = req.body;
    const result = await studentService.createStudentDB(studentData);

    // send response
    res.status(200).json({
      success: true,
      message: "student is created successfully",
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
};



const getAllStudent = async(req:Request, res:Response)=>{
    try {
        const result = await studentService.getAllStudentsFromDB()
        res.status(200).json({
            success: true,
            message: "students data retrieved successfully",
            data: result
        })
    } catch (error) {
        console.log(error)
    }
}


const getSingleStudent = async (req:Request, res:Response)=>{
    try {
        // const studentID = req.params.studentId {1st method}
        const {studentId} = req.params; // {second method}
        const result = await studentService.singleStudentFromDB(studentId)
        res.status(200).json({
            success: true,
            message: 'student id has been retrieved successfully',
            data: result

        })
    } catch (error) {
        console.log(error)
    }
}

export const studentController = {
  createStudent,
  getAllStudent,
  getSingleStudent
};
