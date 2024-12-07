import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { TAcademicSemesterNameCodeMapper } from "./academicSemester.interface";
import { AcademicSemesterService } from "./academicSemester.service";
import httpStatus from "http-status";
const createAcademicSemester = catchAsync(async(req,res)=>{

  const result = await AcademicSemesterService.createAcademicSemesterIntoDB(req.body)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'academic semester is created successfully',
        data: result
    })
})

const getAllAcademicSemesters = catchAsync(async(req,res)=>{
    const result = await AcademicSemesterService.getAllAcademicSemesterFromDB();

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Academic semesters are recieved successfully',
        data: result
    })
})

const getSingleAcademicSemester = catchAsync(async(req,res)=>{
    const {semesterId} = req.params;
    const result=  await AcademicSemesterService.getSingleAcademicSemesterFromDB(semesterId)  ;

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Academic Semester is recieved successfully',
        data: result
    })
})

// update 
const updateAcademicSemester = catchAsync(async(req,res)=>{
    const{semesterId} = req.params; 
    const result = await AcademicSemesterService.updateAcademicSemesterIntoDB(semesterId, req.body);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true, 
        message: 'Academic Semester is Updated Successfully',
        data: result
    })
})

export const academicSemesterController = {
    createAcademicSemester,
    getAllAcademicSemesters,
    getSingleAcademicSemester,
    updateAcademicSemester
}



