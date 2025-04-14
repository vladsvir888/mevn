import { NextFunction, Request, Response } from "express";
import AppError from "../exceptions/app-exception";
import { StatusCode } from "../types/status-code";

const errorMiddleware = (
  error: AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errorStatus = error.statusCode || StatusCode.INTERNAL_SERVER;

  res.status(errorStatus).json({
    status: errorStatus,
    message: error.message || "Произошла какая-то ошибка",
    timestamp: error.timestamp,
    errors: error.errors,
    additionalData: error.additionalData,
  });
};

export default errorMiddleware;
