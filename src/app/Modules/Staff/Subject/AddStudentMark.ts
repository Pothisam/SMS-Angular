export class GetStudentMarkDetailsRequest {
  courseType: string;
  batch: string;
  courseCode: string;
  section: string;
  semester: string;
  examType: string;
  subjectID: number;
  onlyActive: boolean;

  constructor(init?: Partial<GetStudentMarkDetailsRequest>) {
    this.courseType = init?.courseType ?? '';
    this.batch = init?.batch ?? '';
    this.courseCode = init?.courseCode ?? '';
    this.section = init?.section ?? '';
    this.semester = init?.semester ?? '';
    this.examType = init?.examType ?? '';
    this.subjectID = init?.subjectID ?? 0;
    this.onlyActive = init?.onlyActive ?? true;
  }
}
export class StudentMark {
  sysid: number;
  rollNo: string;
  name: string;
  section: string;
  batch: string;
  semester: string;
  examType: string;
  subjectMark: number;
  attendance: string;
  entryBy: string;
  entryDate: string;
  modifiedBy: string;
  modifiedDate: string;
  departmentName: string;

  constructor(init?: Partial<StudentMark>) {
    this.sysid = init?.sysid ?? 0;
    this.rollNo = init?.rollNo ?? '';
    this.name = init?.name ?? '';
    this.section = init?.section ?? '';
    this.batch = init?.batch ?? '';
    this.semester = init?.semester ?? '';
    this.examType = init?.examType ?? '';
    this.subjectMark = init?.subjectMark ?? 0;
    this.attendance = init?.attendance ?? '';
    this.entryBy = init?.entryBy ?? '';
    this.entryDate = init?.entryDate ?? '';
    this.modifiedBy = init?.modifiedBy ?? '';
    this.modifiedDate = init?.modifiedDate ?? '';
    this.departmentName = init?.departmentName ?? '';
  }
}
export class StudentMarkUpdate {
  sysid: number;
  mark: number;

  constructor(init?: Partial<StudentMarkUpdate>) {
    this.sysid = init?.sysid ?? 0;
    this.mark = init?.mark ?? 0;
  }
}
