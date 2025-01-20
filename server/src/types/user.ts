export interface User {
  email: string;
  password: string;
}

export interface UserResponse {
  email: string;
  createdAt: Date;
  updatedAt: Date;
}
