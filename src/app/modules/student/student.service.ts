import { Student } from "./student.interface";
import { studentModel } from "./student.model";

const createStudentDB = async (student: Student) => {
  const result = await studentModel.create(student);
  return result;
};

const getAllStudentsFromDB = async () => {
  const result = await studentModel.find();
  return result;
};

const singleStudentFromDB = async (studentId: string) => {
  const result = await studentModel.findOne({_id:studentId});
  return result;
};

export const studentService = {
  createStudentDB,
  getAllStudentsFromDB,
  singleStudentFromDB,
};
