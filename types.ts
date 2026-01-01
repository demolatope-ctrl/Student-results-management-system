
export interface SubjectScore {
  ca: number;
  exam: number;
}

export interface SubjectResult {
  subject: string;
  scores: SubjectScore;
  highestInClass: number;
  lowestInClass: number;
  classAverage: number;
}

export interface Student {
  id: string; // Admission No
  name: string;
  gender: 'Male' | 'Female';
  class: string;
  session: string;
  term: string;
  status: 'Active' | 'Inactive';
  position: {
    rank: number;
    totalStudents: number;
  };
  photoUrl?: string;
  results: SubjectResult[];
  attendance: {
    daysRecorded: number;
    present: number;
    absent: number;
    leave: number;
  };
  performanceSummary?: string;
}

export interface User {
  id: number;
  username: string;
  password?: string; // Should not be stored plaintext in a real app
  role: 'Admin' | 'Teacher';
}