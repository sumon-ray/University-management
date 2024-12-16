import mongoose, { startSession } from "mongoose";
import config from "../../config";
import { AcademicSemester } from "../academicSemester/academicSemester.model";
import { Student } from "../student/student.interface";
import { StudentModel } from "../student/student.model";
import { TUser } from "./user.interface";
import { User } from "./user.model";
import { generateFacultyId, generateStudentId } from "./user.utils";
import AppError from "../../errors/AppError";
import { TFaculty } from "../faculty/faculty.interface";
import { Faculty } from "../faculty/faculty.model";
import { academicDepartment } from "../academicDepartment/academicDepartment.model";
import httpStatus from "http-status";


const createStudentIntoDB = async (password: string, payload: Student) => {
  // create user object
  const userData: Partial<TUser> = {};
  // if password is not given
  userData.password = password || (config.default_password as string);

  // set student roll
  userData.role = "student";

  // find academic semester info
  const admissionSemester = await AcademicSemester.findById(
    payload.admissionSemester
  );

  if (!admissionSemester) {
    throw new Error("Academic Semester not Found ");
  }

  // transaction roll back

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    // set menuall id
    userData.id = await generateStudentId(admissionSemester);
    // create a user
    const newUser = await User.create([userData], { session });

    // create student
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, "failed to create user");
    }

    payload.id = newUser[0].id; // embaded
    payload.user = newUser[0]._id; // refference id

    const newStudent = await StudentModel.create([payload], { session });

    if (!newStudent) {
      throw new AppError(httpStatus.BAD_REQUEST, "failed to create user");
    }

    await session.commitTransaction();
    await session.endSession();

    return newStudent;
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error ('Failed to create student')
  }
};
// ******************************************************************** //

const createFacultyIntoDB = async (password:string, payload: TFaculty) =>{
  // create a user object 
  const userData: Partial<TUser> = {}

  // if password is not given 
  userData.password = password || (config.default_password as string)
 
  // set a role for faculty 
  userData.role = 'faculty' ;

  // find academic department info
  const academicDepartments = await academicDepartment.findById(
    payload.academicDepartment,
  );

  if (!academicDepartments) {
    throw new AppError(400, 'Academic department not found');
  }

 const session = await mongoose.startSession()
 
 try {
  session.startTransaction();
  //set  generated id
  userData.id = await generateFacultyId();

  // create a user (transaction-1)
  const newUser = await User.create([userData], { session }); // array

  //create a faculty
  if (!newUser.length) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user');
  }
  // set id , _id as user
  payload.id = newUser[0].id;
  payload.user = newUser[0]._id; //reference _id

  // create a faculty (transaction-2)

  const newFaculty = await Faculty.create([payload], { session });

  if (!newFaculty.length) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create faculty');
  }

  await session.commitTransaction();
  await session.endSession();

  return newFaculty;
} catch (err: any) {
  await session.abortTransaction();
  await session.endSession();
  throw new Error(err);
}
};

export const UserServices = {
  createStudentIntoDB,
  createFacultyIntoDB,
  
};
