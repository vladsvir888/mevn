import bcrypt from "bcrypt";
import UserModel from "../models/user-model";
import AppError from "../exceptions/app-exception";
import UserDto from "../dto/user-dto";

class UserService {
  public async registration(email: string, password: string) {
    const existingUser = await UserModel.findOne({ email });

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
    const user = new UserDto(savedUser);

    return user;
  }

  public async login() {
    //
  }
}

const userService = new UserService();

export default userService;
