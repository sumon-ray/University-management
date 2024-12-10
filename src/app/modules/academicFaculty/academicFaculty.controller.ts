import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { academicFacultyService } from "./academicFaculty.service";
import httpStatus from "http-status";
const createAcademicFaculty = catchAsync(async(req,res)=>{
    const result = await academicFacultyService.createAcademicFaculty(req.body)

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'created academic faculty successfully',
        data: result
    })
})

const getAllAcademicFacultyFromDB = catchAsync(async(req,res)=>{
    const result = await academicFacultyService.getAllAcademicFacultyFromDB()

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'all academic faculty retrieved successfully',
        data: result,
    })
})



const getSingleAcademicFacultyFromDB = catchAsync(async(req,res)=>{
    const result = await academicFacultyService.getSingleAcademicFacultyFromDB(req.params.facultyId)

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'single academic faculty retrieved successfully',
        data: result,
    })
})

const updateAcademicFacultyIntoDB= catchAsync(async(req,res)=>{
    const result = await academicFacultyService.updateAcademicFacultyIntoDB(req.params.facultyId, req.body)

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'update academic faculty successfully',
        data: result,
    })
})

export const academicFacultyController = {
    createAcademicFaculty,
    getAllAcademicFacultyFromDB,
    getSingleAcademicFacultyFromDB,
    updateAcademicFacultyIntoDB
}