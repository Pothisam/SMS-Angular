export class StudentCountClassWiseResponse {
  classSysId: number;
  className: string;
  studentCount: number;

  constructor(init?: Partial<StudentCountClassWiseResponse>) {
    this.classSysId = init?.classSysId ?? 0;
    this.className = init?.className ?? '';
    this.studentCount = init?.studentCount ?? 0;
  }
}
