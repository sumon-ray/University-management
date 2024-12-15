// import { Student } from "./student.interface";
import mongoose from "mongoose";
import { StudentModel } from "./student.model";
import AppError from "../../errors/AppError";
import { User } from "../user/user.model";
import httpStatus from "http-status";
import { Student } from "./student.interface";
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

const queryObj = {...query}
  let searchTerm = ''
let studentSearchableFields = ['email', 'name.firstName', 'presentAddress']
  if (query?.searchTerm) {
  searchTerm = query?.searchTerm  as string  
  }

const searchQuery = StudentModel.find({
  $or: studentSearchableFields.map((field)=>({
    [field]: {$regex : searchTerm, $options: 'i'}
  }))
})

// filtering 
 // FILTERING fUNCTIONALITY:
  
 const excludeFields = ['searchTerm', 'sort', 'limit', 'page', 'fields'];
 excludeFields.forEach((el) => delete queryObj[el]);  // DELETING THE FIELDS SO THAT IT CAN'T MATCH OR FILTER EXACTLY

const filterQuery = searchQuery
  .find(queryObj)
  .populate('admissionSemester')
  .populate({
    path: 'academicDepartment',
    populate: {
      path: 'academicFaculty',
    },
  });


// SORTING FUNCTIONALITY:

let sort = '-createdAt'; // SET DEFAULT VALUE 

// IF sort  IS GIVEN SET IT

 if (query.sort) {
  sort = query.sort as string;
}

 const sortQuery = filterQuery.sort(sort);


 // PAGINATION FUNCTIONALITY:

 let page = 1; // SET DEFAULT VALUE FOR PAGE 
 let limit = 1; // SET DEFAULT VALUE FOR LIMIT 
 let skip = 0; // SET DEFAULT VALUE FOR SKIP


// IF limit IS GIVEN SET IT

if (query.limit) {
  limit = Number(query.limit);
}

// IF page IS GIVEN SET IT

if (query.page) {
  page = Number(query.page);
  skip = (page - 1) * limit;
}

const paginateQuery = sortQuery.skip(skip);

const limitQuery = paginateQuery.limit(limit);



// FIELDS LIMITING FUNCTIONALITY:

// HOW OUR FORMAT SHOULD BE FOR PARTIAL MATCH 

fields: 'name,email'; // WE ARE ACCEPTING FROM REQUEST
fields: 'name email'; // HOW IT SHOULD BE 

let fields = '-__v'; // SET DEFAULT VALUE

if (query.fields) {
  fields = (query.fields as string).split(',').join(' ');

}

const fieldQuery = await limitQuery.select(fields);

return fieldQuery;
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
