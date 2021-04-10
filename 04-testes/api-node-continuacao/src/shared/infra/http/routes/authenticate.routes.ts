import { Router } from "express";

import { AuthenticateUserController } from "../../../../modules/accounts/useCases/authenticateUsers/AuthenticateUserController";

const authenticateUserController = new AuthenticateUserController();

const authRouter = Router();

authRouter.post("/", authenticateUserController.handle);

export { authRouter };
