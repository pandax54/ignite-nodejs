"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.specficationRouter = void 0;

var _express = require("express");

var _CreateSpecificationController = require("../../../../modules/cars/useCases/createSpecification/CreateSpecificationController");

var _FindSpecificationController = require("../../../../modules/cars/useCases/listSpecification/FindSpecificationController");

var _ensureAdmin = require("../middlewares/ensureAdmin");

var _ensureAuthenticated = require("../middlewares/ensureAuthenticated");

const createSpecificationController = new _CreateSpecificationController.CreateSpecificationController();
const findSpecificationController = new _FindSpecificationController.FindSpecificationController();
const specficationRouter = (0, _express.Router)(); // specficationRouter.use(ensureAuthenticated);

exports.specficationRouter = specficationRouter;
specficationRouter.post("/", _ensureAuthenticated.ensureAuthenticated, _ensureAdmin.ensureAdmin, createSpecificationController.handle);
specficationRouter.get("/", findSpecificationController.handle);