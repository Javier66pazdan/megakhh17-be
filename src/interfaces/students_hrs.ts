export interface StudentsHrs {
    hrId: string;
    studentId: string;
}

export interface StudentsHrsResponse {
    success: boolean;
    message: string;
}

export type PaginatedHrAndStudentsResponse = {
    students: StudentsHrs[];
    totalItems: number;
    totalPages: number;
    itemsPerPage: number;
    currentPage: number;
} | {
    success: boolean;
    message: string;
}

