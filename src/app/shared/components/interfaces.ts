
export interface User{
  email: string,
  password: string,
  returnSecureToken?: boolean
}

export interface AuthResponse {
  expiresIn: string,
  idToken: string
}
