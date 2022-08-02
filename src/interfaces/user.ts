export interface RegisterUserSecond {
  isSuccessful: false;
  message: string;
}

export interface RegisterUser {
  id: string;
  email: string;
}

export type RegisterUserResponse = RegisterUser | RegisterUserSecond;
