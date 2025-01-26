import express from "express";
import userController from "../controllers/user-controller";
import { userValidator } from "../validators/user-validator";
import authMiddleware from "../middlewares/auth-middleware";

const userRouter = express.Router();

userRouter.post("/registration", userValidator, userController.registration);
userRouter.post("/login", userValidator, userController.login);
userRouter.post("/logout", userController.logout);
userRouter.post("/refresh", userController.refresh);
userRouter.get("/test", authMiddleware, userController.test);

export default userRouter;
