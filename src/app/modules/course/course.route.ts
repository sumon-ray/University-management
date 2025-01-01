import { Router } from "express";
import { CourseController } from "./course.controller";
import validateRequest from "../../middlwares/validateRequest";
import { CourseValidations } from "./course.validation";

const router =Router()
router.post('/create-course', validateRequest(CourseValidations.createCourseValidationSchema), CourseController.createCourseIntoDB)
router.get('/', CourseController.getAllCoursesFromDB)
router.get('/:id', CourseController.getSingleCourseFromDB)
router.patch('/:id', CourseController.updateCourseIntoDB)

export const CourseRoute = router 