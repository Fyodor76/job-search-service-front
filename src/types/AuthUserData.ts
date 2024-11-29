export interface AuthData {
  sub: number;
  email?: string;
  chatId?: string;
  iat: number;
  exp: number;
}

export interface AuthResult {
  isAuth: boolean;
  authData: AuthData | null;
}
