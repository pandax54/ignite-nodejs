"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _authenticate = require("./authenticate.routes");

var _car = require("./car.routes");

var _categories = require("./categories.routes");

var _password = require("./password.routes");

var _rental = require("./rental.routes");

var _specifications = require("./specifications.routes");

var _users = require("./users.routes");

const router = (0, _express.Router)();
router.use("/categories", _categories.categoriesRouter);
router.use("/specifications", _specifications.specficationRouter);
router.use("/users", _users.userRouter);
router.use("/cars", _car.carsRouter);
router.use("/rentals", _rental.rentalRouter);
router.use("/password", _password.passwordRoutes); // router.use("/sessions", authRouter);

router.use(_authenticate.authRouter); // pode ser criando sem um prefix

var _default = router;
exports.default = _default;