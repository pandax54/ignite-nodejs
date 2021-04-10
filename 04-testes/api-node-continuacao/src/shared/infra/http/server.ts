import "reflect-metadata";
import express, { Request, Response, NextFunction } from "express";
import "express-async-errors";
import swaggerUi from "swagger-ui-express";

import swaggerDoc from "../../../swagger.json";
import { AppError } from "../../errors/AppError";
import router from "./routes";

import "../typeorm/database";

import "../../container";

const app = express();
app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDoc));

app.use(router);

app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({ message: err.message });
    }
    return response.status(500).json({
      status: "error",
      message: `Internal server error - ${err.message}`,
    });
  }
);

app.get("/", (request, response) => {
  return response.json({ message: "Hello World" });
});

app.listen(3334, () => console.log("Server is running!"));
