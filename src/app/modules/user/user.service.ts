import { IUser } from "./user.interface"
import User from "./user.model"

const createUser = async(payload: IUser): Promise<IUser>=>{
    const result = await User.create(payload)
    return result

}

// get all user
const getUser = async()=>{
    const result = await User.find()
    return result
}

// get single user
const getSingleUser = async(userId: string)=>{
    const result = await User.findOne({_id: userId})
    return result
}

// update user 
const updateUser = async (id: string, data:IUser) =>{
 const result = await User.findByIdAndUpdate(id, data,{new: true})
 return result
}

// delete user 
const deleteUser = async (id: string) =>{
    const result = await User.findByIdAndDelete(id)
    return result
   }

export const userService = {
    createUser,
    getUser,
    getSingleUser,
    updateUser,
    deleteUser
}