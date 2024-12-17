import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { AdminServices } from "./admin.service";
import httpStatus from "http-status";
const createAdminIntoDB = catchAsync(async(req,res)=>{
    const result = AdminServices.getAllAdminsFromDB(req.query)

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'all admins recieved successfully',
        data: result
    })
})


export const adminController = {
    createAdminIntoDB
}