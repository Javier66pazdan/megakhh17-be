export interface RegisterHrs {
  id: string;
  fullName: string;
}

export type GetHrsResponse =
  | RegisterHrs
  | {
      success: false;
      message: string;
    };
