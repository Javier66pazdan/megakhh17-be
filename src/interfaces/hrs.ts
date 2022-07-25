export interface RegisterHrs {
    id: string;
    fullName: string;
}

export type GetHrsResponse = RegisterHrs | {
    isSuccessful: false;
    message: string;
}