import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { FacultyServices } from "./faculty.service";



const getAllFaculties = catchAsync(async(req,res)=>{
  const result =  await FacultyServices.getAllFacultiesFromDB(req.query)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculties are recieved successfully',
    data: result

  })


})


export const FacultyControllers = {
    getAllFaculties,
}