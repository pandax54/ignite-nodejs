import "reflect-metadata";
import "dotenv/config";
import express, { Request, Response, NextFunction } from "express";
import "express-async-errors";
import swaggerUi from "swagger-ui-express";

import upload from "@config/upload";

import swaggerDoc from "../../../swagger.json";
import { AppError } from "../../errors/AppError";
import createConnection from "../typeorm/database";
import router from "./routes";

import "../../container";

createConnection();
const app = express();
app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDoc));

// arquivos estáticos, verificar as pastas dentro da app
app.use("/avatar", express.static(`${upload.tmpFolder}/avatar`));
app.use("/cars", express.static(`${upload.tmpFolder}/cars`));

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

export { app };
