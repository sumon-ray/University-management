import { TAcademicSemester } from "../academicSemester/academicSemester.interface";
import { User } from "./user.model";

const findLastStudentId = async () => {
  const lastStudent = await User.findOne(
    {
      role: "student",
    },
    {
      id: 1,
      _id: 0,
    }
  )
    .sort({
      createdAt: -1,
    })
    .lean();
  return lastStudent?.id ? lastStudent.id : undefined;
};

// year, semesterCode,
export const generateStudentId = async (payload: TAcademicSemester) => {
  // console.log()
let currentId =  (0).toString(); // 0000 by default      
const lastStudentId = await findLastStudentId()
const lastStudentSemesterCode = lastStudentId?.substring(4,6) //01
const lastStudentYear = lastStudentId?.substring(0,4)

const currentSemesterCode = payload.code
const currentYear = payload.year;
if ((lastStudentId && lastStudentSemesterCode === currentSemesterCode && lastStudentYear ===currentYear)) {
  currentId = lastStudentId.substring(6)    
}

  let incrementId = (Number(currentId) + 1).toString().padStart(4, "0");

  incrementId = `${payload.year}${payload.code}${incrementId}`;
  return incrementId;
};
// ****************************************************************************

// Faculty ID
export const findLastFacultyId = async () => {
  const lastFaculty = await User.findOne(
    {
      role: 'faculty',
    },
    {
      id: 1,
      _id: 0,     
    },        
  )  
    .sort({
      createdAt: -1,
    })
    .lean();

  return lastFaculty?.id ? lastFaculty.id.substring(2) : undefined;
};


export const generateFacultyId = async () => {
  let currentId = (0).toString();
  const lastFacultyId = await findLastFacultyId();

  if (lastFacultyId) {
    currentId = lastFacultyId.substring(2);
  }

  let incrementId = (Number(currentId) + 1).toString().padStart(4, '0');

  incrementId = `F-${incrementId}`;

  return incrementId;
};

// ***************************************************

export const findLastAdminId = async()=>{
  const lastAdminId = await User.findOne(
    {
      role: 'admin'
    },
    {
      id: 1,
      _id: 0
    },
  )
  .sort({
    createdAt: -1
  })
  .lean()
  return lastAdminId?.id ? lastAdminId.id.substring(2) : undefined
}

export const generateAdminId =async()=>{
let currentId = (0).toString()
let lastAdminId = await findLastAdminId()

if (lastAdminId) {
  currentId = lastAdminId.substring(2)  
}

let incrementId = (Number(currentId)+1).toString().padStart(4, '0')
incrementId = `F-${incrementId}`
return incrementId
}
