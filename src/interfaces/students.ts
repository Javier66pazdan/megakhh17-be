export interface Student {
  courseCompletion: number;
  courseEngagement: number;
  projectDegree: number;
  teamProjectDegree: number;
}

export type AllStudentsResponse = Student[];

export interface PaginatedAllStudentsResponse {
  allStudents: Student[];
  totalItems: number;
  totalPages: number;
  itemsPerPage: number;
  currentPage: number;
}
