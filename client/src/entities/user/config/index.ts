export interface User {
  email: string
  password: string
}

export interface UserResponse {
  accessToken: string
  createdAt: string
  email: string
  refreshToken: string
  updatedAt: string
}
