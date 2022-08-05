export interface RegisterHrs {
  id: string;
  fullName: string;
}

export type HrsFailedResponse = {
  success: false;
  message: string;
};

export type GetHrsResponse = RegisterHrs | HrsFailedResponse;

export interface GetOneHrResponse {
  id: string;
  fullName: string;
  company: string;
  maxReservedStudents: number;
  userId: string;
  userEmail: string;
}
