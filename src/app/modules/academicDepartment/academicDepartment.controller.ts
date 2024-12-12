import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { academicDepartmentService } from "./academicDepartment.service";
import httpStatus from "http-status";
const createAcademicDepartmentIntoDB = catchAsync(async(req,res)=>{
    const result = await academicDepartmentService.createAcademicDepartmentIntoDB(req.body)
    
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true, 
        message: "created academic department successfully",
        data: result
    })
})
const getAllAcademicDepartmentIntoDB = catchAsync(async(req,res)=>{
    const result = await academicDepartmentService.getAllAcademicDepartmentFromDB()
    
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true, 
        message: "academic departments are recieved successfully",
        data: result
    })
})
const getSingleAcademicDepartmentIntoDB = catchAsync(async(req,res)=>{
    const result = await academicDepartmentService.getSingleAcademicDepartmentFromDB(req.params.departmentId)
    
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true, 
        message: "academic department is recieved successfully",
        data: result
    })
})

const updateAcademicDepartmentIntoDB = catchAsync(async(req,res)=>{
    const result = await academicDepartmentService.updateAcademicDepartmentIntoDB(req.params.departmentId, req.body)
    
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true, 
        message: "academic department is updated successfully",
        data: result
    })
})



export const academicDepartmentController = {
    createAcademicDepartmentIntoDB,
    getAllAcademicDepartmentIntoDB,
    getSingleAcademicDepartmentIntoDB,
    updateAcademicDepartmentIntoDB
}