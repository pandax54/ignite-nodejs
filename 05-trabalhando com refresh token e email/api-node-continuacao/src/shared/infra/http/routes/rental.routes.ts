/* eslint-disable no-use-before-define */
import { Router } from "express";

import { CreateRentalController } from "@modules/rentals/useCases/createRental/CreateRentalController";
import { DevolutionRentalController } from "@modules/rentals/useCases/devolutionRental/DevolutionRentalController";
import { ListRentalsByUserController } from "@modules/rentals/useCases/listRentalsByUser/ListRentalsByUserController";

import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const createCarController = new CreateRentalController();
const devolutionRentalController = new DevolutionRentalController();
const listRentalsByUserController = new ListRentalsByUserController();
const rentalRouter = Router();

rentalRouter.post("/", ensureAuthenticated, createCarController.handle); // nosso controller funcionará como um middleware, dessa forma ele receberá o request e response

rentalRouter.post(
  "/devolution/:id",
  ensureAuthenticated,
  devolutionRentalController.handle
);

rentalRouter.get(
  "/user",
  ensureAuthenticated,
  listRentalsByUserController.handle
);

export { rentalRouter };
