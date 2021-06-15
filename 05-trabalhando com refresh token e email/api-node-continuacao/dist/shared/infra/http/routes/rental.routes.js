"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.rentalRouter = void 0;

var _express = require("express");

var _CreateRentalController = require("../../../../modules/rentals/useCases/createRental/CreateRentalController");

var _DevolutionRentalController = require("../../../../modules/rentals/useCases/devolutionRental/DevolutionRentalController");

var _ListRentalsByUserController = require("../../../../modules/rentals/useCases/listRentalsByUser/ListRentalsByUserController");

var _ensureAuthenticated = require("../middlewares/ensureAuthenticated");

/* eslint-disable no-use-before-define */
const createCarController = new _CreateRentalController.CreateRentalController();
const devolutionRentalController = new _DevolutionRentalController.DevolutionRentalController();
const listRentalsByUserController = new _ListRentalsByUserController.ListRentalsByUserController();
const rentalRouter = (0, _express.Router)();
exports.rentalRouter = rentalRouter;
rentalRouter.post("/", _ensureAuthenticated.ensureAuthenticated, createCarController.handle); // nosso controller funcionará como um middleware, dessa forma ele receberá o request e response

rentalRouter.post("/devolution/:id", _ensureAuthenticated.ensureAuthenticated, devolutionRentalController.handle);
rentalRouter.get("/user", _ensureAuthenticated.ensureAuthenticated, listRentalsByUserController.handle);