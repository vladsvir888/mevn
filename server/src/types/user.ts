export interface User {
  name: string;
  surname: string;
  email: string;
  password: string;
}

export interface UserResponse {
  name: string;
  surname: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
  isActivated: boolean;
}
