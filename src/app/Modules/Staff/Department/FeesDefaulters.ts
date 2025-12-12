export class FeesDefaultersRequest {
  courseType: string;
  batch: string;
  semester: string;
  isactive: boolean = false;

  constructor(data: Partial<FeesDefaultersRequest> = {}) {
    this.courseType = data.courseType ?? '';
    this.batch = data.batch ?? '';
    this.semester = data.semester ?? '';
  }
}
export class FeesDefaultersResponse {
  id: number;
  studentId: number | null;
  name: string;
  rollNo: string | null;
  dob: string;
  finYear: string | null;
  departmentName: string;
  departmentCode: string;
  courseNameSD: string;
  courseCode: string;
  section: string;
  batch: string;
  semester: string;
  debit: number;
  credit: number;
  concession: number;
  balance: number;
  status: string;
  guid: string;

  constructor(data: Partial<FeesDefaultersResponse> = {}) {
    this.id = data.id ?? 0;
    this.studentId = data.studentId ?? null;
    this.name = data.name ?? '';
    this.rollNo = data.rollNo ?? null;
    this.dob = data.dob ?? '';
    this.finYear = data.finYear ?? null;
    this.departmentName = data.departmentName ?? '';
    this.departmentCode = data.departmentCode ?? '';
    this.courseNameSD = data.courseNameSD ?? '';
    this.courseCode = data.courseCode ?? '';
    this.section = data.section ?? '';
    this.batch = data.batch ?? '';
    this.semester = data.semester ?? '';
    this.debit = data.debit ?? 0;
    this.credit = data.credit ?? 0;
    this.concession = data.concession ?? 0;
    this.balance = data.balance ?? 0;
    this.status = data.status ?? '';
    this.guid = data.guid ?? '';
  }
}
