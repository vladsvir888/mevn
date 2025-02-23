import { NextFunction, Request, Response } from "express";
import userService from "../services/user-service";
import { User } from "../types/user";
import { StatusCode } from "../types/status-code";
import TimeService from "../services/time-service";

class UserController {
  public async registration(req: Request, res: Response, next: NextFunction) {
    try {
      userService.validationReq(req);

      const { email, password } = req.body as User;
      const userData = await userService.registration(email, password);

      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: TimeService.daysToMilliseconds(1),
        httpOnly: true,
      });
      res.status(StatusCode.CREATED).json(userData);
    } catch (error) {
      next(error);
    }
  }

  public async login(req: Request, res: Response, next: NextFunction) {
    try {
      userService.validationReq(req);

      const { email, password } = req.body as User;
      const userData = await userService.login(email, password);

      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: TimeService.daysToMilliseconds(1),
        httpOnly: true,
      });
      res.status(StatusCode.OK).json(userData);
    } catch (error) {
      next(error);
    }
  }

  public async logout(req: Request, res: Response, next: NextFunction) {
    try {
      const { refreshToken } = req.cookies;

      await userService.logout(refreshToken);

      res.clearCookie("refreshToken");
      res.status(StatusCode.OK).json({ status: "logged out" });
    } catch (error) {
      next(error);
    }
  }

  public async refresh(req: Request, res: Response, next: NextFunction) {
    try {
      const { refreshToken } = req.cookies;

      const userData = await userService.refresh(refreshToken);

      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: TimeService.daysToMilliseconds(1),
        httpOnly: true,
      });
      res.status(StatusCode.OK).json(userData);
    } catch (error) {
      next(error);
    }
  }

  public test(req: Request, res: Response, next: NextFunction) {
    try {
      res.status(StatusCode.OK).json({ msg: "Привет!" });
    } catch (error) {
      next(error);
    }
  }
}

const userController = new UserController();

export default userController;
