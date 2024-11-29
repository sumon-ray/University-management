import { model, Schema } from "mongoose";
import { IUser } from "./user.interface";

const userSchema = new Schema<IUser>({
    name: {
        type: String,
        required: [true, "please name is required"],
        minLenght: 3,
        maxLength: 5,
    },
    age:{type: Number, required: [true, 'age is required']},
    email: {type: String, unique:true, required:[true, "please provide valid email"],
    validate:{
        validator:function(value: string){
           return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
        },
        message: "{VALUE} is not valid",
        },
        // immutable: true
},

    photo: String,
    role: {type: String,enum:{values:["admin", "user"], message: "{VALUE} please enter a valid role"}, required: true, default: "user"},
    userStatus: {type: String, enum: ["active", "inactive"], required: true}
})

const User = model<IUser>('User', userSchema)
export default User