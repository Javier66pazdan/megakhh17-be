export interface Student {
  id: string;
  courseCompletion: number;
  courseEngagement: number;
  projectDegree: number;
  teamProjectDegree: number;
  bonusProjectUrls: string;
  status: number;
}

export type AllStudentsResponse = Student[];

export interface PaginatedAllStudentsResponse {
  allStudents: Student[];
  totalItems: number;
  totalPages: number;
  itemsPerPage: number;
  currentPage: number;
}
