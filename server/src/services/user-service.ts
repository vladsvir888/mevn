import bcrypt from "bcrypt";
import { Request } from "express";
import { validationResult } from "express-validator";
import UserModel from "../models/user-model";
import AppError from "../exceptions/app-exception";
import UserDto from "../dto/user-dto";
import tokenService from "./token-service";
import { UserResponse } from "../types/user";

class UserService {
  public validationReq(req: Request) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      throw AppError.BadRequest(
        "Произошла ошибка при валидации данных",
        errors.array()
      );
    }
  }

  public async registration(email: string, password: string) {
    const existingUser = await UserModel.findOne({ email }).lean();

    if (existingUser) {
      throw AppError.Conflict(
        "Пользователь с таким адресом электронной почты уже существует."
      );
    }

    const salt = Number(process.env.SALT) || 10;
    const hashPassword = await bcrypt.hash(password, salt);
    const newUser = new UserModel({
      password: hashPassword,
      email,
    });
    const savedUser = await newUser.save();
    const userDto = new UserDto(savedUser);

    const tokens = await tokenService.getTokens({ ...userDto });
    await tokenService.saveToken(userDto.email, tokens.refreshToken);

    return {
      ...userDto,
      ...tokens,
    };
  }

  public async login(email: string, password: string) {
    const existingUser = await UserModel.findOne({ email }).lean();

    if (!existingUser) {
      throw AppError.Unauthorized(
        "Пользователь с таким адресом электронной почты не найден."
      );
    }

    const isMatchPassword = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isMatchPassword) {
      throw AppError.Unauthorized("Пароль неверен.");
    }

    const userDto = new UserDto(existingUser);

    const tokens = await tokenService.getTokens({ ...userDto });
    await tokenService.saveToken(userDto.email, tokens.refreshToken);

    return {
      ...userDto,
      ...tokens,
    };
  }

  public async logout(refreshToken: string) {
    await tokenService.removeToken(refreshToken);
  }

  public async refresh(refreshToken: string) {
    if (!refreshToken) {
      throw AppError.Unauthorized("Токен не передан.");
    }

    const decoded = (await tokenService.decodeRefreshToken(
      refreshToken
    )) as UserResponse;

    if (!decoded) {
      throw AppError.Unauthorized("Невалидный токен.");
    }

    const userDto = new UserDto(decoded);

    const tokens = await tokenService.getTokens({ ...userDto });
    await tokenService.saveToken(userDto.email, tokens.refreshToken);

    return {
      ...userDto,
      ...tokens,
    };
  }
}

const userService = new UserService();

export default userService;
