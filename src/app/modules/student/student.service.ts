// import { Student } from "./student.interface";
import mongoose from "mongoose";
import { StudentModel } from "./student.model";
import AppError from "../../errors/AppError";
import { User } from "../user/user.model";
import httpStatus from "http-status";
import { Student } from "./student.interface";
import QueryBuilder from "../../builder/QueryBuilder";
import { studentSearchableFields } from "./student.constant";
// import { string } from "zod";
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

const getAllStudentsFromDB = async (query: Record<string, unknown> ) => {
   const studentQuery = new QueryBuilder(
    StudentModel.find().populate(''),query
   )
   .search(studentSearchableFields)
   .filter()
   .sort()
   .paginate()
   .fields()


   const result = await studentQuery.modelQuery
   return result
};






const getSingleStudentFromDB = async (id: string) => {
  // const result = await StudentModel.findOne({ id });
  const result = await StudentModel.findOne({ id })
    .populate("admissionSemester")
    .populate({
      path: "academicDepartment",
      populate: {
        path: "academicFaculty",
      },
    });

  return result;
};



const updateStudentIntoDB = async (id: string, payload: Partial<Student>) => {

const {name, guardian, localGuardian, ...remainingStudentData} = payload 

const modifiedUpdatedData : Record<string, unknown> = {
  ...remainingStudentData,
}

if(name && Object.keys(name).length){
  for(const [key, value] of Object.entries(name)){
    modifiedUpdatedData[`name.${key}`] = value
};

}
if(guardian && Object.keys(guardian).length){
  for(const [key, value] of Object.entries(guardian)){
    modifiedUpdatedData[`guardian.${key}`] = value
};

}
if(localGuardian && Object.keys(localGuardian).length){
  for(const [key, value] of Object.entries(localGuardian)){
    modifiedUpdatedData[`localGuardian.${key}`] = value
}
}



  const result = await StudentModel.findOneAndUpdate({ id }, modifiedUpdatedData, {
    new: true, runValidators: true
  });

  return result;
};

const deleteStudentFromDB = async (id: string) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const deleteStudent = await StudentModel.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session }
    );
    if (!deleteStudent) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to delete data ");
    }

    const deletedUser = await User.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session }
    );

    if (!deletedUser) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to delete user");
    }

    await session.commitTransaction();
    await session.endSession();

    return deleteStudent;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error("faild to create student");
  }
};

export const StudentServices = {
  // createStudentIntoDB,
  getAllStudentsFromDB,
  getSingleStudentFromDB,
  deleteStudentFromDB,
  updateStudentIntoDB,
};

// findOne will use when we will not use mongodb _id
