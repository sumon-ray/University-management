import { Router } from "express";
import { academicSemesterController } from "./academicSemester.controller";
import validateRequest from "../../middlwares/validateRequest";
import { AcademicSemesterValidation } from "./academicSemester.validation";

const router = Router();

router.post(
  "/create-academic-semester", validateRequest(AcademicSemesterValidation.createAcademicSemesterValidationSchema),
  academicSemesterController.createAcademicSemester
);

router.get('/', academicSemesterController.getAllAcademicSemesters);
router.get('/:semesterId', academicSemesterController.getSingleAcademicSemester);
router.patch('/:semesterId',validateRequest(AcademicSemesterValidation.updateAcademicSemesterValidationSchema) ,academicSemesterController.updateAcademicSemester)

export const AcademicSemesterRoute = router;
