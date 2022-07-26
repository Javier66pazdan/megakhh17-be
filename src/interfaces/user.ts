export interface RegisterUser {
  id: string;
  email: string;
}

export type RegisterUserResponse =
  | RegisterUser
  | {
      isSuccessful: false;
      message: string;
    };
