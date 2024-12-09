import config from "../../config";
import { AcademicSemester } from "../academicSemester/academicSemester.model";
import { Student } from "../student/student.interface";
import { StudentModel } from "../student/student.model";
import { TUser } from "./user.interface";
import { User } from "./user.model";
import { generateStudentId } from "./user.utils";

const createStudentIntoDB = async (password: string, payload: Student) => {
  // create user object
  const userData: Partial<TUser> = {}
  // if password is not given
  userData.password = password || (config.default_password as string)

  // set student roll
  userData.role = 'student'


// find academic semester info 
const admissionSemester = await AcademicSemester.findById(payload.admissionSemester)

if (!admissionSemester) {
  throw new Error ('Academic Semester not Found ')
}


  // set menuall id
  userData.id =await generateStudentId(admissionSemester )
  // create a user 
  const newUser = await User.create(userData);

  // create student 
  if(Object.keys(newUser).length){
    // set id, _id as userData 
    payload.id = newUser.id // embaded 
    payload.user = newUser._id // refference id

    const newStudent = await StudentModel.create(payload)
    return newStudent
  }
};

export const UserServices = {
  createStudentIntoDB,
};
