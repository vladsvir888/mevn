import { StatusCode } from "../types/status-code";

class AppError extends Error {
  statusCode: number;
  timestamp: string;
  errors: unknown[];

  constructor(statusCode: number, message: string, errors: unknown[] = []) {
    super(message);
    this.name = "AppError";
    this.statusCode = statusCode;
    this.errors = errors;
    this.timestamp = new Date().toISOString();
    Error.captureStackTrace(this, AppError);
  }

  public static BadRequest(message: string, errors: unknown[] = []) {
    return new AppError(StatusCode.BAD_REQUEST, message, errors);
  }

  public static Conflict(message: string) {
    return new AppError(StatusCode.CONFLICT, message);
  }

  public static Unauthorized(message: string) {
    return new AppError(StatusCode.UNAUTHORIZED, message);
  }

  public static NotFound(message: string) {
    return new AppError(StatusCode.NOT_FOUND, message);
  }
}

export default AppError;
