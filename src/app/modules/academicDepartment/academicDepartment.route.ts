import { Router } from "express";
import { academicDepartmentController } from "./academicDepartment.controller";
import validateRequest from "../../middlwares/validateRequest";
import { AcademicDepartmentValidation } from "./academicDepartment.validation";

const router = Router();

router.post(
  "/create-academic-department",
//   validateRequest(
//     AcademicDepartmentValidation.createAcademicDepartmentValidationSchema
//   ),
  academicDepartmentController.createAcademicDepartmentIntoDB
);
router.get("/", academicDepartmentController.getAllAcademicDepartmentIntoDB);
router.get(
  "/:departmentId",
  academicDepartmentController.getSingleAcademicDepartmentIntoDB
);
router.patch(
  "/:departmentId",
  validateRequest(
    AcademicDepartmentValidation.updateAcademicDepartmentValidationSchema
  ),
  academicDepartmentController.updateAcademicDepartmentIntoDB
);

export const AcademicDepartmentRoute = router;
