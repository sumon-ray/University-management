import express, { Application, NextFunction, Request, Response } from "express";
import cors from "cors";
import { UserRoutes } from "./app/modules/user/user.route";
import { StudentRoutes } from "./app/modules/student/student.route";
import globalErrorHandler from "./app/middlwares/globalErrorhandler";
// import userRouter from "./app/modules/user-demo/user.router";
// import { studentRoute } from "./app/modules/student/student.route";

const app: Application = express();

// parser  // middleware --> standard to say
app.use(express.json());
app.use(cors());

// student
// app.use('/api/student', studentRoute)
app.use("/api/student", StudentRoutes);
app.use("/api/users", UserRoutes);

const getAController = (req: Request, res: Response) => {
  res.send("hello world");
};
app.get("/", getAController);

app.use(globalErrorHandler)

// app.use(globalErrorHandler)
export default app;
