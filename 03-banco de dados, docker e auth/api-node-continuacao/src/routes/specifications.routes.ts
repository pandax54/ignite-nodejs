import { Router } from "express";

import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { CreateSpecificationController } from "../modules/cars/useCases/createSpecification/CreateSpecificationController";
import { FindSpecificationController } from "../modules/cars/useCases/listSpecification/FindSpecificationController";

const createSpecificationController = new CreateSpecificationController();
const findSpecificationController = new FindSpecificationController();

const specficationRouter = Router();

specficationRouter.use(ensureAuthenticated);
specficationRouter.post("/", createSpecificationController.handle);

specficationRouter.get("/", findSpecificationController.handle);

export { specficationRouter };
