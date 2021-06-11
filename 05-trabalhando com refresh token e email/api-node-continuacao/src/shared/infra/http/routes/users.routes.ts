import { Router } from "express";
import multer from "multer";

import uploadConfig from "../../../../config/upload";
import { CreateUserController } from "../../../../modules/accounts/useCases/createUsers/CreateUserController";
import { UpdateUserAvatarController } from "../../../../modules/accounts/useCases/updateUserAvatar/updateUserAvatarController";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

// const uploadAvatar = multer(uploadConfig.upload("./tmp/avatar"));
const uploadAvatar = multer(uploadConfig);

const createUserController = new CreateUserController();
const updateUserAvatarController = new UpdateUserAvatarController();

const userRouter = Router();

userRouter.post("/", createUserController.handle);

userRouter.patch(
  "/avatar",
  ensureAuthenticated,
  uploadAvatar.single("file"),
  updateUserAvatarController.handle
);

export { userRouter };
