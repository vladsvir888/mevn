import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import userService from "../services/user-service";
import { User } from "../types/user";
import { StatusCode } from "../types/status-code";
import AppError from "../exceptions/app-exception";

class UserController {
  public async registration(req: Request, res: Response, next: NextFunction) {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        throw AppError.BadRequest(
          "Произошла ошибка при валидации данных",
          errors.array()
        );
      }

      const { email, password } = req.body as User;
      const user = await userService.registration(email, password);

      res.status(StatusCode.CREATED).json(user);
    } catch (error) {
      next(error);
    }
  }

  public async login(req: Request, res: Response) {
    //
  }
}

const userController = new UserController();

export default userController;
