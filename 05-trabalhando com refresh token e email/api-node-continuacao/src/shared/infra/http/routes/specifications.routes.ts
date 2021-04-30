import { Router } from "express";

import { CreateSpecificationController } from "../../../../modules/cars/useCases/createSpecification/CreateSpecificationController";
import { FindSpecificationController } from "../../../../modules/cars/useCases/listSpecification/FindSpecificationController";
import { ensureAdmin } from "../middlewares/ensureAdmin";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const createSpecificationController = new CreateSpecificationController();
const findSpecificationController = new FindSpecificationController();

const specficationRouter = Router();

// specficationRouter.use(ensureAuthenticated);
specficationRouter.post(
  "/",
  ensureAuthenticated,
  ensureAdmin,
  createSpecificationController.handle
);

specficationRouter.get("/", findSpecificationController.handle);

export { specficationRouter };
