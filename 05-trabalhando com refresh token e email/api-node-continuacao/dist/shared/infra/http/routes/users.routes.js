"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.userRouter = void 0;

var _express = require("express");

var _multer = _interopRequireDefault(require("multer"));

var _ProfileUserController = require("../../../../modules/accounts/useCases/profileUser/ProfileUserController");

var _upload = _interopRequireDefault(require("../../../../config/upload"));

var _CreateUserController = require("../../../../modules/accounts/useCases/createUsers/CreateUserController");

var _updateUserAvatarController = require("../../../../modules/accounts/useCases/updateUserAvatar/updateUserAvatarController");

var _ensureAuthenticated = require("../middlewares/ensureAuthenticated");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// const uploadAvatar = multer(uploadConfig.upload("./tmp/avatar"));
const uploadAvatar = (0, _multer.default)(_upload.default);
const createUserController = new _CreateUserController.CreateUserController();
const updateUserAvatarController = new _updateUserAvatarController.UpdateUserAvatarController();
const profileUserController = new _ProfileUserController.ProfileUserController();
const userRouter = (0, _express.Router)();
exports.userRouter = userRouter;
userRouter.post("/", createUserController.handle);
userRouter.patch("/avatar", _ensureAuthenticated.ensureAuthenticated, uploadAvatar.single("file"), updateUserAvatarController.handle);
userRouter.get("/profile", _ensureAuthenticated.ensureAuthenticated, profileUserController.handle);