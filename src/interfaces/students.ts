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

