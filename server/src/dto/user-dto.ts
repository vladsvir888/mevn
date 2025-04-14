import { UserResponse } from "../types/user";

class UserDto {
  name: string;
  surname: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
  isActivated: boolean;

  constructor(user: UserResponse) {
    this.name = user.name;
    this.surname = user.surname;
    this.email = user.email;
    this.createdAt = user.createdAt;
    this.updatedAt = user.updatedAt;
    this.isActivated = user.isActivated;
  }
}

export default UserDto;
