export class StudentTransferRequest {
  academicYearFrom: number;
  academicYearTo: number;
  classSectionFrom: number;
  classSectionTo: number;

  constructor(init?: Partial<StudentTransferRequest>) {
    this.academicYearFrom = init?.academicYearFrom ?? 0;
    this.academicYearTo = init?.academicYearTo ?? 0;
    this.classSectionFrom = init?.classSectionFrom ?? 0;
    this.classSectionTo = init?.classSectionTo ?? 0;
  }
}
