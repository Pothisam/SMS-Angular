export class StudentTransferResponse {
  studentId: number;
  studentName: string;
  dob: Date;

  fromAcademicYear: string;
  fromClassName: string;
  fromSectionName: string;

  toAcademicYear: string;

  existingClassName: string | null;
  existingSectionName: string | null;

  alreadyExisting: number;

  constructor(init?: Partial<StudentTransferResponse>) {
    this.studentId = init?.studentId ?? 0;
    this.studentName = init?.studentName ?? '';
    this.dob = init?.dob ? new Date(init.dob) : new Date();

    this.fromAcademicYear = init?.fromAcademicYear ?? '';
    this.fromClassName = init?.fromClassName ?? '';
    this.fromSectionName = init?.fromSectionName ?? '';

    this.toAcademicYear = init?.toAcademicYear ?? '';

    this.existingClassName = init?.existingClassName ?? null;
    this.existingSectionName = init?.existingSectionName ?? null;

    this.alreadyExisting = init?.alreadyExisting ?? 0;
  }
}
