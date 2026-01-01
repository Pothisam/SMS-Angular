export class StudentDetailsShortResponse {
  sysId: number;
  name: string;
  courseSection: string;
  acadamicYear: string;
  gender: string;
  rollNo: string | null;
  dob: Date | null;
  enteredBy: string;
  entryDate: Date | null;
  modifiedBy: string | null;
  modifiedDate: Date | null;
  guid: string | null;

  constructor(init?: Partial<StudentDetailsShortResponse>) {
    this.sysId = init?.sysId ?? 0;
    this.name = init?.name ?? '';
    this.courseSection = init?.courseSection ?? '';
    this.acadamicYear = init?.acadamicYear ?? '';
    this.gender = init?.gender ?? '';
    this.rollNo = init?.rollNo ?? null;
    this.dob = init?.dob ? new Date(init.dob) : null;
    this.enteredBy = init?.enteredBy ?? '';
    this.entryDate = init?.entryDate ? new Date(init.entryDate) : null;
    this.modifiedBy = init?.modifiedBy ?? null;
    this.modifiedDate = init?.modifiedDate ? new Date(init.modifiedDate) : null;
    this.guid = init?.guid ?? null;
  }
}
export class StudentCountResponse {
  totalStudent: number;
  male: number;
  female: number;
  transgender: number;
  ug: number;
  pg: number;

  constructor(init?: Partial<StudentCountResponse>) {
    this.totalStudent = init?.totalStudent ?? 0;
    this.male = init?.male ?? 0;
    this.female = init?.female ?? 0;
    this.transgender = init?.transgender ?? 0;
    this.ug = init?.ug ?? 0;
    this.pg = init?.pg ?? 0;
  }
}
