import { StatusCode } from "../types/status-code";

interface AdditionalData {
  isNeedRefresh?: boolean;
}

class AppError extends Error {
  statusCode: number;
  timestamp: string;
  errors: unknown[];
  additionalData?: AdditionalData;

  constructor(
    statusCode: number,
    message: string,
    errors: unknown[] = [],
    additionalData?: AdditionalData
  ) {
    super(message);
    this.name = "AppError";
    this.statusCode = statusCode;
    this.errors = errors;
    this.timestamp = new Date().toISOString();
    this.additionalData = additionalData;
    Error.captureStackTrace(this, AppError);
  }

  public static BadRequest(message: string, errors: unknown[] = []) {
    return new AppError(StatusCode.BAD_REQUEST, message, errors);
  }

  public static Conflict(message: string) {
    return new AppError(StatusCode.CONFLICT, message);
  }

  public static Unauthorized(message: string, additionalData?: AdditionalData) {
    return new AppError(StatusCode.UNAUTHORIZED, message, [], additionalData);
  }
}

export default AppError;
