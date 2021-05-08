import { Router } from "express";

import { authRouter } from "./authenticate.routes";
import { carsRouter } from "./car.routes";
import { categoriesRouter } from "./categories.routes";
import { passwordRoutes } from "./password.routes";
import { rentalRouter } from "./rental.routes";
import { specficationRouter } from "./specifications.routes";
import { userRouter } from "./users.routes";

const router = Router();

router.use("/categories", categoriesRouter);
router.use("/specifications", specficationRouter);
router.use("/users", userRouter);
router.use("/cars", carsRouter);
router.use("/rentals", rentalRouter);
router.use("/password", passwordRoutes);
// router.use("/sessions", authRouter);
router.use(authRouter); // pode ser criando sem um prefix

export default router;
