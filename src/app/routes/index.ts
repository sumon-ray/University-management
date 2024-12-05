import { Router } from "express";
import { UserRoutes } from "../modules/user/user.route";
import { StudentRoutes } from "../modules/student/student.route";

const router = Router()

const moduleRoutes = [
    {
        path: '/users',
        route: UserRoutes
    },
    {
        path: '/student',
        route: StudentRoutes
    }
]


moduleRoutes.forEach(route => router.use(route.path, route.route))

router.use('/users', )
router.use('/student', )


export default router