import { Student } from "./student.interface";
import { StudentModel } from "./student.model";

const createStudentIntoDB = async (studentData: Student) => {
  // const result = await StudentModel.create(student);// build in static method
  //**********************************************************

  //   const student = new StudentModel(studentData)
  //   if(await student.isUserExists(studentData.id)){
  //     throw new Error('user already exist!')
  //   }

  //  const result =await  student.save() // build in instance method
  //**********************************************************

  if (await StudentModel.isUserExists(studentData.id)) {
    throw new Error("user already exists!");
  }
  const result = await StudentModel.create(studentData); // build in static method

  return result;
};

const getAllStudentsFromDB = async () => {
  const result = await StudentModel.find();
  return result;
};

const getSingleStudentFromDB = async (id: string) => {
  const result = await StudentModel.findOne({ id });
  return result;
};

export const StudentServices = {
  createStudentIntoDB,
  getAllStudentsFromDB,
  getSingleStudentFromDB,
};
