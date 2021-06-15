"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.authRouter = void 0;

var _express = require("express");

var _RefreshTokenController = require("../../../../modules/accounts/useCases/refreshToken/RefreshTokenController");

var _AuthenticateUserController = require("../../../../modules/accounts/useCases/authenticateUsers/AuthenticateUserController");

const authenticateUserController = new _AuthenticateUserController.AuthenticateUserController();
const refreshTokenController = new _RefreshTokenController.RefreshTokenController();
const authRouter = (0, _express.Router)();
exports.authRouter = authRouter;
authRouter.post("/sessions", authenticateUserController.handle);
authRouter.post("/refresh-token", refreshTokenController.handle);