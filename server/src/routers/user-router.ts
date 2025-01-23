import express from "express";
import userController from "../controllers/user-controller";
import userValidator from "../validators/user-validator";

const userRouter = express.Router();

userRouter.post("/registration", userValidator, userController.registration);
userRouter.post("/login", userValidator, userController.login);

export default userRouter;
