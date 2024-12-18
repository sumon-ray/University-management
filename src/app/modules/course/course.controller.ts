import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { CourseService } from "./course.service";
import httpStatus from "http-status";
const createCourseIntoDB = catchAsync(async (req, res) => {
  const result = await CourseService.createCourseIntoDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "create course successfully",
    data: result,
  });
});
const getAllCoursesFromDB = catchAsync(async (req, res) => {
  const result = await CourseService.getAllCoursesFromDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "All courses recieved successfully",
    data: result,
  });
});
const getSingleCourseFromDB = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await CourseService.getSingleCourseFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "course recieved successfully",
    data: result,
  });
});

export const CourseController = {
  createCourseIntoDB,
  getAllCoursesFromDB,
  getSingleCourseFromDB,
};
