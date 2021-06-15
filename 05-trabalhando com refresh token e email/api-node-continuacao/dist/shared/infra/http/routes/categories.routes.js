"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.categoriesRouter = void 0;

var _express = require("express");

var _multer = _interopRequireDefault(require("multer"));

var _CreateCategoryController = require("../../../../modules/cars/useCases/createCategory/CreateCategoryController");

var _ImportCategoryController = require("../../../../modules/cars/useCases/importCategory/ImportCategoryController");

var _ListCategoryController = require("../../../../modules/cars/useCases/listCategory/ListCategoryController");

var _ensureAdmin = require("../middlewares/ensureAdmin");

var _ensureAuthenticated = require("../middlewares/ensureAuthenticated");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable no-use-before-define */
// import createCategoryController from "../modules/cars/useCases/createCategory";
// import listCategoryController from "../modules/cars/useCases/listCategory";
// precisamos instanciar o multer para utiliza-lo como middleware
const upload = (0, _multer.default)({
  dest: "./tmp"
});
const categoriesRouter = (0, _express.Router)();
exports.categoriesRouter = categoriesRouter;
const createCategoryController = new _CreateCategoryController.CreateCategoryController();
const listCategoryController = new _ListCategoryController.ListCategoryController();
const importCategoryController = new _ImportCategoryController.ImportCategoryController(); // modo anterior
// categoriesRouter.post("/", (request: Request, response: Response) => {
//   return createCategoryController().handle(request, response);
// });

categoriesRouter.post("/", _ensureAuthenticated.ensureAuthenticated, _ensureAdmin.ensureAdmin, createCategoryController.handle); // nosso controller funcionará como um middleware, dessa forma ele receberá o request e response

categoriesRouter.get("/", listCategoryController.handle);
categoriesRouter.post("/import", _ensureAuthenticated.ensureAuthenticated, _ensureAdmin.ensureAdmin, upload.single("file"), importCategoryController.handle);