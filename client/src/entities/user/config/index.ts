export interface User {
  name: string
  surname: string
  email: string
  password: string
}

export interface UserDetails {
  name: string
  surname: string
  email: string
  createdAt: string
  updatedAt: string
}

export interface UserResponse {
  user: UserDetails
  accessToken: string
  refreshToken: string
}
