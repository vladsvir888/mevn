import express from "express";
import userController from "../controllers/user-controller";
import {
  loginValidator,
  registrationValidator,
} from "../validators/user-validator";
import authMiddleware from "../middlewares/auth-middleware";

const userRouter = express.Router();

userRouter.post(
  "/registration",
  registrationValidator,
  userController.registration
);
userRouter.post("/login", loginValidator, userController.login);
userRouter.post("/logout", userController.logout);
userRouter.post("/refresh", userController.refresh);
userRouter.get("/test", authMiddleware, userController.test);

export default userRouter;
