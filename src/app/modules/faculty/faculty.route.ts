import { Router } from "express";
import { FacultyControllers } from "./faculty.controller";

const router = Router()

router.post('/create-faculty', FacultyControllers.getAllFaculties )

export const FacultyRouter = router