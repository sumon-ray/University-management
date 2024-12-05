import config from "../../config";
import { Student } from "../student/student.interface";
import { StudentModel } from "../student/student.model";
import { TUser } from "./user.interface";
// import { NewUser } from "./user.interface";
import { User } from "./user.model";

const createStudentIntoDB = async (password: string, studentData: Student) => {
  // create user object
  const userData: Partial<TUser> = {}
  // if password is not given
  userData.password = password || (config.default_password as string)

  // set student roll
  userData.role = 'student'

  // set menuall id
  userData.id = '103010001'
  // create a user 
  const newUser = await User.create(userData);

  // create student 
  if(Object.keys(newUser).length){
    // set id, _id as userData 
    studentData.id = newUser.id // embaded 
    studentData.user = newUser._id // refference id

    const newStudent = await StudentModel.create(studentData)
    return newStudent
  }
};

export const UserServices = {
  createStudentIntoDB,
};
