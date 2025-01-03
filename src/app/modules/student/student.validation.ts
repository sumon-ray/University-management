import { z } from "zod";

// UserName validation
const userNameValidationSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  middleName: z.string().optional(),
  lastName: z.string().min(1, "Last name is required"),
});

// Guardian validation
const guardianValidationSchema = z.object({
  fatherName: z.string().min(1, "Father's name is required"),
  fatherOccupation: z.string().min(1, "Father's occupation is required"),
  fatherContactNo: z.string().min(1, "Father's contact number is required"),
  motherName: z.string().min(1, "Mother's name is required"),
  motherOccupation: z.string().min(1, "Mother's occupation is required"),
  motherContactNo: z.string().min(1, "Mother's contact number is required"),
});

// LocalGuardian validation
const localGuardianValidationSchema = z.object({
  name: z.string().min(1, "Local guardian's name is required"),
  occupation: z.string().min(1, "Local guardian's occupation is required"),
  contactNo: z.string().min(1, "Local guardian's contact number is required"),
  address: z.string().min(1, "Local guardian's address is required"),
});

// Main Student schema
export const createStudentValidationSchema = z.object({
  body: z.object({
    password:z.string().max(20),
  
    student: z.object({
      name: userNameValidationSchema,
      gender: z.enum(["male", "female"]),
      dateOfBirth: z.string().optional(),
      email: z.string().email("Invalid email address"),
      contactNo: z.string().min(1, "Contact number is required"),
      emergencyContactNo: z.string().min(1, "Emergency contact number is required"),
      bloogGroup: z.enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]),
      presentAddress: z.string().min(1, "Present address is required"),
      permanentAddres: z.string().min(1, "Permanent address is required"),
      guardian: guardianValidationSchema,
      localGuardian: localGuardianValidationSchema,
      profileImg: z.string().optional(),  
      admissionSemester: z.string(),
      academicDepartment: z.string()
    })
  })
})   
  
//update UserName validation
const updateUserNameValidationSchema = z.object({
  firstName: z.string().min(1, "First name is required").optional(),
  middleName: z.string().optional(),
  lastName: z.string().min(1, "Last name is required").optional(),
});

//update Guardian validation
const updateGuardianValidationSchema = z.object({
  fatherName: z.string().min(1, "Father's name is required").optional(),
  fatherOccupation: z.string().min(1, "Father's occupation is required").optional(),
  fatherContactNo: z.string().min(1, "Father's contact number is required").optional(),
  motherName: z.string().min(1, "Mother's name is required").optional(),
  motherOccupation: z.string().min(1, "Mother's occupation is required").optional(),
  motherContactNo: z.string().min(1, "Mother's contact number is required").optional(),
});

// update LocalGuardian validation
const updateLocalGuardianValidationSchema = z.object({
  name: z.string().min(1, "Local guardian's name is required").optional(),
  occupation: z.string().min(1, "Local guardian's occupation is required").optional(),
  contactNo: z.string().min(1, "Local guardian's contact number is required").optional(),
  address: z.string().min(1, "Local guardian's address is required").optional(),
});

//update Main Student schema
export const UpdateStudentValidationSchema = z.object({
  body: z.object({
    // password:z.string().max(20).optional(),
  
    student: z.object({
      name: updateUserNameValidationSchema,
      gender: z.enum(["male", "female"]).optional(),
      dateOfBirth: z.string().optional().optional(),
      email: z.string().email("Invalid email address").optional(),
      contactNo: z.string().min(1, "Contact number is required").optional(),
      emergencyContactNo: z.string().min(1, "Emergency contact number is required").optional(),
      bloogGroup: z.enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]).optional(),
      presentAddress: z.string().min(1, "Present address is required").optional(),
      permanentAddres: z.string().min(1, "Permanent address is required").optional(),
      guardian: updateGuardianValidationSchema,
      localGuardian: updateLocalGuardianValidationSchema,
      profileImg: z.string().optional().optional(),  
      admissionSemester: z.string().optional(),
      academicDepartment: z.string().optional()
    })
  })
})   
  
// Export the schema
export const studentValidations = {
  createStudentValidationSchema,
  UpdateStudentValidationSchema

};
    