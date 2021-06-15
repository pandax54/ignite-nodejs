import { Router } from "express";
import multer from "multer";

import { ProfileUserController } from "@modules/accounts/useCases/profileUser/ProfileUserController";

import uploadConfig from "../../../../config/upload";
import { CreateUserController } from "../../../../modules/accounts/useCases/createUsers/CreateUserController";
import { UpdateUserAvatarController } from "../../../../modules/accounts/useCases/updateUserAvatar/updateUserAvatarController";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

// const uploadAvatar = multer(uploadConfig.upload("./tmp/avatar"));
const uploadAvatar = multer(uploadConfig);

const createUserController = new CreateUserController();
const updateUserAvatarController = new UpdateUserAvatarController();
const profileUserController = new ProfileUserController();

const userRouter = Router();

userRouter.post("/", createUserController.handle);

userRouter.patch(
  "/avatar",
  ensureAuthenticated,
  uploadAvatar.single("file"),
  updateUserAvatarController.handle
);

userRouter.get("/profile", ensureAuthenticated, profileUserController.handle);

export { userRouter };
