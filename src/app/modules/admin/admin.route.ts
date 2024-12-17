import { Router } from "express";
import { adminController } from "./admin.controller";

const router = Router()
router.post('/', adminController.createAdminIntoDB)

export const AdminRoute = router