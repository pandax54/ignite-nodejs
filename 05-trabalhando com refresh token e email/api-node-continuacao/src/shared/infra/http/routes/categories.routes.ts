/* eslint-disable no-use-before-define */
import { Router, Request, Response } from "express";
import multer from "multer";

import { CreateCategoryController } from "../../../../modules/cars/useCases/createCategory/CreateCategoryController";
// import createCategoryController from "../modules/cars/useCases/createCategory";
import { ImportCategoryController } from "../../../../modules/cars/useCases/importCategory/ImportCategoryController";
import { ListCategoryController } from "../../../../modules/cars/useCases/listCategory/ListCategoryController";
import { ensureAdmin } from "../middlewares/ensureAdmin";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
// import listCategoryController from "../modules/cars/useCases/listCategory";

// precisamos instanciar o multer para utiliza-lo como middleware
const upload = multer({ dest: "./tmp" });

const categoriesRouter = Router();

const createCategoryController = new CreateCategoryController();
const listCategoryController = new ListCategoryController();
const importCategoryController = new ImportCategoryController();
// modo anterior
// categoriesRouter.post("/", (request: Request, response: Response) => {
//   return createCategoryController().handle(request, response);
// });

categoriesRouter.post(
  "/",
  ensureAuthenticated,
  ensureAdmin,
  createCategoryController.handle
); // nosso controller funcionará como um middleware, dessa forma ele receberá o request e response

categoriesRouter.get("/", listCategoryController.handle);

categoriesRouter.post(
  "/import",
  ensureAuthenticated,
  ensureAdmin,
  upload.single("file"),
  importCategoryController.handle
);

export { categoriesRouter };
