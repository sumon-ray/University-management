import config from "../../config";
import { TStudent } from "../student/student.interface";
import { Student } from "../student/student.model";
import { TUser } from "./user.interface";
import { User } from "./user.model";

const createStudentIntoDB = async (password: string, studentData: TStudent) => {
  try {
    if (!studentData || typeof studentData !== "object") {
      throw new Error("Invalid student data provided");
    }

    const userData: Partial<TUser> = {};
    userData.password = password || (config.default_password as string);
    userData.role = "student";
    userData.id = "2030100001";

    console.log("User Data:", userData);

    const newUser = await User.create(userData);
    console.log("Created User:", newUser);
    if (!newUser) throw new Error("User creation failed");

    studentData.id = newUser.id;
    studentData.user = newUser._id;

    console.log("Prepared Student Data:", studentData);

    const newStudent = await Student.create(studentData);
    console.log("Created Student:", newStudent);

    return newStudent;
  } catch (error: any) {
    console.error(
      "Error in createStudentIntoDB:",
      error.stack || error.message,
    );
    throw new Error("Invalid student data provided");
  }
};

export const UserServices = {
  createStudentIntoDB,
};
