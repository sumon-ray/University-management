import { Router } from "express";
import { academicFacultyController } from "./academicFaculty.controller";
import validateRequest from "../../middlwares/validateRequest";
import { academicFacultyValidation } from "./academicFaculty.validation";

const router = Router()
 
router.post('/create-academic-faculty', validateRequest(academicFacultyValidation.createAcademicFacultyValidationSchema), academicFacultyController.createAcademicFaculty)
router.get('/', academicFacultyController.getAllAcademicFacultyFromDB)
router.get('/:facultyId', academicFacultyController.getSingleAcademicFacultyFromDB)
router.patch('/:facultyId', validateRequest(academicFacultyValidation.updateAcademicFacultyValidationSchema),academicFacultyController.updateAcademicFacultyIntoDB)
export const AcademicFacultyRoutes =  router 