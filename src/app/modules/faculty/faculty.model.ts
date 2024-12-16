import { Schema } from "mongoose";
import { FacultyModel, TBloodGroup, TFaculty, TGender, TUserName } from "./faculty.interface";
import { model } from "mongoose";

const userNameSchema = new Schema <TUserName>({
 firstName: {
    type: String,
    required: [true, 'first name is required'],
    trim: true,
    maxlength: [20, 'name can not be more than 20 characters']
 }
})

export const Gender: TGender[] = ['male', 'female', 'other'];

export const BloodGroup: TBloodGroup[] = [
    'A+',
    'A-',
    'B+',
    'B-',
    'AB+',
    'AB-',
    'O+',
    'O-',
  ];

const facultySchema = new Schema<TFaculty, FacultyModel>({
        id: {
            type: String,
            required: [true, 'ID is required'],
            unique: true,
        },
        user: {
            type: Schema.Types.ObjectId,
            required: [true," User is is required"],
            unique: true,
            ref: 'User'
        },
        designation: {
            type: String,
            required: [true, 'Designation is required'],
          },
          name: {
            type: userNameSchema,
            required: [true, 'name is required']
          },
          gender: {
            type: String,
            enum: {
                values: Gender, 
                message: '{VALUE} is not a valid gender'
            },
            required: [true, 'Gender is required']

          },
          dateOfBirth: { type: Date },
          email: {
            type: String,
            required: [true, 'Email is required'],
            unique: true,
          },
          contactNo: { type: String, required: [true, 'Contact number is required'] },
          emergencyContactNo: {
            type: String,
            required: [true, 'Emergency contact number is required'],
          },
          bloogGroup: {
            type: String, 
            required: [true, 'blood group is required'],
            enum: {
                values: BloodGroup,
                message: '{VALUES} is not valid blood group'
            }
          },
          presentAddress: {
            type: String,
            required: [true, 'Present address is required'],
          },
          permanentAddress: {
            type: String,
            required: [true, 'Permanent address is required'],
          },
          profileImg: { type: String },
          academicDepartment: {
            type: Schema.Types.ObjectId,
            required: [true, 'User id is required'],
            ref: 'User',
          },
          isDeleted: {
            type: Boolean,
            default: false,
          },

    },
    {
        toJSON: {
            virtuals: true
        }
    })


    
// generating full name
facultySchema.virtual('fullName').get(function () {
  return (
    this?.name?.firstName +
    '' +
    this?.name?.middleName +
    '' +
    this?.name?.lastName
  );
});

// filter out deleted documents
facultySchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

facultySchema.pre('findOne', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

facultySchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});

//checking if user is already exist!
facultySchema.statics.isUserExists = async function (id: string) {
  const existingUser = await Faculty.findOne({ id });
  return existingUser;
};

export const Faculty = model<TFaculty, FacultyModel>('Faculty', facultySchema);



