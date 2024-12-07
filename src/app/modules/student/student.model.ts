import { Schema, model } from "mongoose";
// import { Guardian, LocalGuardian, Student, StudentMethods, StudentModel2, UserName } from './student.interface';// studentMethod
import {
  Guardian,
  LocalGuardian,
  Student,
  StudentModel2,
  UserName,
} from "./student.interface";


const userNameSchema = new Schema<UserName>({
  firstName: {
    type: String,
    required: true,
  },
  middleName: {
    type: String,
  },
  lastName: {
    type: String,
    required: true,
  },
});

const guardianSchema = new Schema<Guardian>({
  fatherName: {
    type: String,
    required: true,
  },
  fatherOccupation: {
    type: String,
    required: true,
  },
  fatherContactNo: {
    type: String,
    required: true,
  },
  motherName: {
    type: String,
    required: true,
  },
  motherOccupation: {
    type: String,
    required: true,
  },
  motherContactNo: {
    type: String,
    required: true,
  },
});

const localGuradianSchema = new Schema<LocalGuardian>({
  name: {
    type: String,
    required: true,
  },
  occupation: {
    type: String,
    required: true,
  },
  contactNo: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
});

const studentSchema = new Schema<Student, StudentModel2>({
  id: { type: String },
  user: {
    type: Schema.Types.ObjectId,
    required: [true, 'user id is required'],
    unique: true,
    ref: 'User'
  },

  name: userNameSchema,
  gender: ["male", "female"],
  dateOfBirth: { type: Date },
  email: { type: String, required: true },
  contactNo: { type: String, required: true },
  emergencyContactNo: { type: String, required: true },
  bloogGroup: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
  presentAddress: { type: String, required: true },
  permanentAddres: { type: String, required: true },
  guardian: guardianSchema,
  localGuardian: localGuradianSchema,
  profileImg: { type: String },
  admissionSemester: {
    type: Schema.Types.ObjectId,
    ref: "AcademicSemester"
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
},
{
  toJSON:{
    virtuals: true
  }
}
);


// Quary middleware

studentSchema.pre("find", async function (next) {
  // console.log(this);
  this.find({isDeleted: {$ne: true}})
  next()
});
studentSchema.pre("findOne", async function (next) {
  // console.log(this);
  this.find({isDeleted: {$ne: true}})
  next()
});

// studentSchema.pre('aggregate', async function(next){
//   this.pipeline().unshift({$match: {isDeleted: {$ne:true}}})
//   next()
// })
// vertual

studentSchema.virtual('fullName').get(function(){
  return `${this.name.firstName}  ${this.name.middleName} ${this.name.lastName}`
})
// creating a custom instance method
//**********************************************************

// studentSchema.methods.isUserExists = async function (id:string) {
//   const existingUser = await StudentModel.findOne({id})
//   return existingUser
// }
//**********************************************************

// Creating a custom static method
//**********************************************************
studentSchema.statics.isUserExists = async function (id: string) {
  const existingUser = await StudentModel.findOne({ id });
  return existingUser;
};
//**********************************************************

export const StudentModel = model<Student, StudentModel2>(
  "Student",
  
  studentSchema
);
