// import { Student } from "./student.interface";
import mongoose from "mongoose";
import { StudentModel } from "./student.model";
import AppError from "../../errors/AppError";
import { User } from "../user/user.model";
import httpStatus from "http-status";
// const createStudentIntoDB = async (studentData: Student) => {
//   // const result = await StudentModel.create(student);// build in static method
//   //**********************************************************

//   //   const student = new StudentModel(studentData)
//   //   if(await student.isUserExists(studentData.id)){
//   //     throw new Error('user already exist!')
//   //   }

//   //  const result =await  student.save() // build in instance method
//   //**********************************************************

//   if (await StudentModel.isUserExists(studentData.id)) {
//     throw new Error("user already exists!");
//   }
//   const result = await StudentModel.create(studentData); // build in static method

//   return result;
// };

const getAllStudentsFromDB = async () => {
  const result = await StudentModel.find()
  .populate('admissionSemester')
  .populate({
    path: 'academicDepartment',
    populate: {
      path: 'academicFaculty'
    }
  })
  return result;
};

const getSingleStudentFromDB = async (id: string) => {
  // const result = await StudentModel.findOne({ id });
  const result = await StudentModel.findOne({id})
  .populate('admissionSemester')
  .populate({
    path: 'academicDepartment',
    populate: {
      path: 'academicFaculty'
    }
  })

  return result;
};
const updateStudentIntoDB = async (id: string, ) => {
  // const result = await StudentModel.findOne({ id });
  const result = await StudentModel.findOne({id})
 

  return result;
};




const deleteStudentFromDB = async (id: string) => {

  const session =await mongoose.startSession()

  try {
    
    session.startTransaction()


      const deleteStudent = await StudentModel.findOneAndUpdate({ id }, {isDeleted: true}, {new: true, session});
      if (!deleteStudent) {
        throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete data ')
        
      }

      const deletedUser = await User.findOneAndUpdate(
        {id},
        {isDeleted: true},
        {new: true, session}
      )

      if (!deletedUser) {
        throw new AppError(httpStatus.BAD_REQUEST, "Failed to delete user")
      }

      await session.commitTransaction()
      await session.endSession()



      return deleteStudent;
    
  } catch (error) {
    await session.abortTransaction()
    await session.endSession()
  }
};

export const StudentServices = {
  // createStudentIntoDB,
  getAllStudentsFromDB,
  getSingleStudentFromDB,
  deleteStudentFromDB
};




// findOne will use when we will not use mongodb _id