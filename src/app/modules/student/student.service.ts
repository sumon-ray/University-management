// import { Student } from "./student.interface";
import { StudentModel } from "./student.model";

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
  const result = await StudentModel.findById(id)
  .populate('admissionSemester')
  .populate({
    path: 'academicDepartment',
    populate: {
      path: 'academicFaculty'
    }
  })
  
  return result;
};
const deleteStudentFromDB = async (id: string) => {
  const result = await StudentModel.updateOne({ id }, {isDeleted: true});
  return result;
};

export const StudentServices = {
  // createStudentIntoDB,
  getAllStudentsFromDB,
  getSingleStudentFromDB,
  deleteStudentFromDB
};
