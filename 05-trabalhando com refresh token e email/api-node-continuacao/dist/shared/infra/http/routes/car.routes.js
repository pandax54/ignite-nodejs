"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.carsRouter = void 0;

var _express = require("express");

var _multer = _interopRequireDefault(require("multer"));

var _CreateCarController = require("../../../../modules/cars/useCases/createCar/CreateCarController");

var _CreateCarSpecificationController = require("../../../../modules/cars/useCases/createCarSpecification/CreateCarSpecificationController");

var _ListAvailableCarsController = require("../../../../modules/cars/useCases/listAvailableCars/ListAvailableCarsController");

var _UploadCarImageController = require("../../../../modules/cars/useCases/uploadCarImage/UploadCarImageController");

var _upload = _interopRequireDefault(require("../../../../config/upload"));

var _ensureAdmin = require("../middlewares/ensureAdmin");

var _ensureAuthenticated = require("../middlewares/ensureAuthenticated");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable no-use-before-define */
const carsRouter = (0, _express.Router)();
exports.carsRouter = carsRouter;
const createCarController = new _CreateCarController.CreateCarController();
const listAvailableCarsController = new _ListAvailableCarsController.ListAvailableCarsController();
const createCarSpecificationController = new _CreateCarSpecificationController.CreateCarSpecificationController();
const uploadCarImageController = new _UploadCarImageController.UploadCarImageController();
const uploadCarImage = (0, _multer.default)(_upload.default);
carsRouter.post("/", _ensureAuthenticated.ensureAuthenticated, _ensureAdmin.ensureAdmin, createCarController.handle); // nosso controller funcionará como um middleware, dessa forma ele receberá o request e response

carsRouter.get("/available", listAvailableCarsController.handle);
carsRouter.post("/specifications/:id", _ensureAuthenticated.ensureAuthenticated, _ensureAdmin.ensureAdmin, createCarSpecificationController.handle);
carsRouter.post("/images/:id", uploadCarImage.array("images"), _ensureAuthenticated.ensureAuthenticated, _ensureAdmin.ensureAdmin, uploadCarImageController.handle);