import { NextFunction, Request, Response } from "express";
import tokenService from "../services/token-service";
import AppError from "../exceptions/app-exception";
import UserModel from "../models/user-model";
import { UserResponse } from "../types/user";

const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(" ")?.[1];

  if (!token) {
    return next(
      AppError.Unauthorized("Токен не передан.", { isNeedRefresh: false })
    );
  }

  const decoded = (await tokenService.decodeAccessToken(
    token ?? ""
  )) as UserResponse;

  if (!decoded) {
    return next(
      AppError.Unauthorized("Невалидный токен.", { isNeedRefresh: true })
    );
  }

  const user = await UserModel.findOne({ email: decoded.email }).lean();

  if (!user) {
    return next(
      AppError.Unauthorized("Пользователь не найден.", {
        isNeedRefresh: false,
      })
    );
  }

  Object.assign(req, { user: decoded });

  next();
};

export default authMiddleware;
