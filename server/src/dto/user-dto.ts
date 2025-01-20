import { UserResponse } from "../types/user";

class UserDto {
  email: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(user: UserResponse) {
    this.email = user.email;
    this.createdAt = user.createdAt;
    this.updatedAt = user.updatedAt;
  }
}

export default UserDto;
