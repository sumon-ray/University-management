import mongoose, { startSession } from "mongoose";
import config from "../../config";
import { AcademicSemester } from "../academicSemester/academicSemester.model";
import { Student } from "../student/student.interface";
import { StudentModel } from "../student/student.model";
import { TUser } from "./user.interface";
import { User } from "./user.model";
import { generateStudentId } from "./user.utils";
import AppError from "../../errors/AppError";

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

export const UserServices = {
  createStudentIntoDB,
};
