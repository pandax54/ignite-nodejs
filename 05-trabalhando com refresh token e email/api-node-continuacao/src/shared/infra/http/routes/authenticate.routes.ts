import { Router } from "express";

import { RefreshTokenController } from "@modules/accounts/useCases/refreshToken/RefreshTokenController";

import { AuthenticateUserController } from "../../../../modules/accounts/useCases/authenticateUsers/AuthenticateUserController";

const authenticateUserController = new AuthenticateUserController();
const refreshTokenController = new RefreshTokenController();

const authRouter = Router();

authRouter.post("/", authenticateUserController.handle);
authRouter.post("/refresh-token", refreshTokenController.handle);

export { authRouter };
