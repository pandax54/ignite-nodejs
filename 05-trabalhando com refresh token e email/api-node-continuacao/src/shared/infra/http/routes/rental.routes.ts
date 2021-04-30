/* eslint-disable no-use-before-define */
import { Router } from "express";

import { CreateRentalController } from "@modules/rentals/useCases/createRental/CreateRentalController";

import { ensureAdmin } from "../middlewares/ensureAdmin";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const createCarController = new CreateRentalController();

const rentalRouter = Router();

rentalRouter.post(
  "/",
  ensureAuthenticated,
  ensureAdmin,
  createCarController.handle
); // nosso controller funcionará como um middleware, dessa forma ele receberá o request e response

export { rentalRouter };
