import { Router } from "express";
import { CourseController } from "./course.controller";

const router =Router()
router.post('/', CourseController.createCourseIntoDB)
router.get('/', CourseController.getAllCoursesFromDB)
router.get('/:id', CourseController.getSingleCourseFromDB)

export const CourseRoute = router 