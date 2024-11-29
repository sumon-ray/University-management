import express, { Application, Request, Response } from "express";
import cors from "cors";
import { useRouter } from "./app/modules/car/car.route";
import { orderRouter } from "./app/modules/order/order.route";
import { errorHandler } from "./app/modules/car/car.controller";
const app: Application = express();

// parser  // middleware --> standard to say
app.use(express.json());
app.use(cors());
// Car
app.use("/api/cars", useRouter);

// order
app.use("/api/orders", orderRouter);
app.use(errorHandler);
const getAController = (req: Request, res: Response) => {
  res.send("hello world");
};
app.get("/", getAController);

export default app;
