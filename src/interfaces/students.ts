export enum Apprenticeship {
  YES = 'Tak',
  NO = 'Nie',
}

export enum Status {
  NOT_ACTIVE,
  AVAILABLE,
  RESERVED,
  HIRED,
}

export interface Student {
  id: string;
  courseCompletion: number;
  courseEngagement: number;
  projectDegree: number;
  teamProjectDegree: number;
  bonusProjectUrls: string;
  status: Status;
}

export type GetOneStudentResponse =
  | Student
  | {
      success: boolean;
      message: string;
    };

export type GetOneStudentResponseWithErrors = Student;

export interface PaginatedAllStudentsResponse {
  allStudents: Student[];
  totalItems: number;
  totalPages: number;
  itemsPerPage: number;
  currentPage: number;
}

export interface PaginatedFilteredStudentsResponse {
  filteredStudents: Student[];
  totalItems: number;
  totalPages: number;
  itemsPerPage: number;
  currentPage: number;
}

export interface GetUpdateStatusResponse {
  success: boolean;
  message: string;
}
