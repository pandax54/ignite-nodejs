/* eslint-disable no-use-before-define */
import { Router } from "express";

import { CreateCarController } from "@modules/cars/useCases/createCar/CreateCarController";

const carsRouter = Router();

const createCarController = new CreateCarController();

carsRouter.post("/", createCarController.handle); // nosso controller funcionará como um middleware, dessa forma ele receberá o request e response

export { carsRouter };
