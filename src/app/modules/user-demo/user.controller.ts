// request && response manage korbe

import { Request, Response } from "express";
import { userService } from "./user.service";

const createUser = async (req: Request, res: Response) => {
  try {
    const payload = req.body;

    const result = await userService.createUser(payload);
    res.status(200).json({
      status: true,
      message: "user created succcessfully",
      data: result,
    });
  } catch (error) {
    res.json({
      status: false,
      message: "user create failed",
      error,
    });
  }
};

// get user

const getUser = async(req:Request, res:Response)=>{
    try {
        const result = await userService.getUser()

        res.status(200).json({
            status: true, 
            message: "user retrieved successfully",
            data: result

        })
    } catch (error) {
        res.json({
            status:false, 
            message: false, 
            error
        })
    }
}

// get single User 

const getSingleUser = async(req:Request, res:Response)=>{
    try {
        const {userId} = req.params
        const result = await userService.getSingleUser(userId)

        res.status(200).json({
            status: true,
            message: "single user found successfully",
            data: result
        })
    } catch (error) {
        res.json({
            status:false, 
            message: false, 
            error
        })
    }
}
// update User 

const updateUser = async(req:Request, res:Response)=>{
    try {
        const data = req.body
        const {userId} = req.params
        const result = await userService.updateUser(userId,data)

        res.status(200).json({
            status: true,
            message: " user updated successfully",
            data: result
        })
    } catch (error) {
        res.json({
            status:false, 
            message: false, 
            error
        })
    }
}
// delete User 

const deleteUser = async(req:Request, res:Response)=>{
    try {
        const {userId} = req.params
        const result = await userService.deleteUser(userId)

        res.status(200).json({
            status: true,
            message: "user deleted successfully",
            data: result
        })
    } catch (error) {
        res.json({
            status:false, 
            message: false, 
            error
        })
    }
}


export const userController = {
  createUser,
  getUser,
  getSingleUser,
  updateUser,
  deleteUser
};
