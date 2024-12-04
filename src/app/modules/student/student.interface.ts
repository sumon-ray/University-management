import { Model } from "mongoose";

export type UserName = {
  firstName: string;
  middleName: string;
  lastName: string;
};

export type Guardian = {
  fatherName: string;
  fatherOccupation: string;
  fatherContactNo: string;
  motherName: string;
  motherOccupation: string;
  motherContactNo: string;
};

export type LocalGuardian = {
  name: string;
  occupation: string;
  contactNo: string;
  address: string;
};

export type Student = {
  id: string;
  password:string;
  name: UserName;
  gender: "male" | "female";
  dateOfBirth?: string;
  email: string;
  contactNo: string;
  emergencyContactNo: string;
  bloogGroup?: "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-";
  presentAddress: string;
  permanentAddres: string;
  guardian: Guardian;
  localGuardian: LocalGuardian;
  profileImg?: string;
  isActive: "active" | "blocked";
  isDeleted: boolean
};

// for creating instance
//**********************************************************

// export type StudentMethods = {
//   isUserExists(id: string): Promise<Student | null>;
// };

// export type StudentModel2 = Model<
//   Student,
//   Record<never, string>,
//   StudentMethods
// >;
//**********************************************************

// for creating static method
//**********************************************************
export interface StudentModel2 extends Model<Student> {
  isUserExists(id: string): Promise<Student | null>;
}
//**********************************************************
