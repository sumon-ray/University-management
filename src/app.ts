import express, { Application, Request, Response } from "express";
import cors from "cors";
import userRouter from "./app/modules/user-demo/user.router";
import { studentRoute } from "./app/modules/student/student.route";

const app: Application = express();

// parser  // middleware --> standard to say
app.use(express.json());
app.use(cors());

// student
app.use('/api/student', studentRoute)
app.use('/api/users', userRouter)

const getAController = (req: Request, res: Response) => {
  res.send("hello world");
};
app.get("/", getAController);

export default app;
