import express from "express";
import { StudentControllers } from "./student.controller";

const router = express.Router();

// router.post("/create-student", StudentControllers.createStudent);

router.get("/", StudentControllers.getAllStudents);

router.get("/:studentId", StudentControllers.getSingleStudent);
router.delete("/:studentId", StudentControllers.deleteStudentFromDB);
router.patch("/:studentId", StudentControllers.updateStudentIntoDB);

export const StudentRoutes = router;
