
export interface User{
  email: string,
  password: string,
  returnSecureToken?: boolean
}

export interface AuthResponse {
  expiresIn: string,
  idToken: string
}

export interface Post {
  id?: string,
  title: string,
  author: string,
  text: string,
  date: Date
}

export interface FbCreateResponse {
  name: string
}
