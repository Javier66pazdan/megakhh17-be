export interface Student {
  courseCompletion: number;
  courseEngagement: number;
  projectDegree: number;
  teamProjectDegree: number;
}

export type AllStudentsResponse = Student[];

export interface PaginatedAllStudentsResponse {
  students: Student[];
  totalPages: number;
  itemsPerPage: number;
}
