export class InsertSubstitutionRequest {
  Sysid: number;
  courseType: string;
  batch: string;
  courseCode: string;
  section: string;
  semester: string;
  hour: string;
  date: string;
  subjectCode: number;
  staffCode: number;
  onlyActive: boolean;

  constructor(data: Partial<InsertSubstitutionRequest> = {}) {
    this.Sysid = data.Sysid ?? 0;
    this.courseType = data.courseType ?? '';
    this.batch = data.batch ?? '';
    this.courseCode = data.courseCode ?? '';
    this.section = data.section ?? '';
    this.semester = data.semester ?? '';
    this.hour = data.hour ?? '';
    this.date = data.date ?? '';
    this.subjectCode = data.subjectCode ?? 0;
    this.staffCode = data.staffCode ?? 0;
    this.onlyActive = data.onlyActive ?? true;
  }
}
export class TimeSheetSubstitutionResponse {
  sysId: number;
  courseType: string;
  batch: string;
  courseCode: string;
  courseName: string;
  section: string;
  attDate: string;
  attHour: string;
  subjectName: string;
  subjectId: number;
  staffCode: number;
  departmentCode: string;
  staffName: string;
  entryBy: string;
  entryDate: string;
  modifiedBy: string;
  modifiedDate: string;
  guid: string;

  constructor(data: Partial<TimeSheetSubstitutionResponse> = {}) {
    this.sysId = data.sysId ?? 0;
    this.courseType = data.courseType ?? '';
    this.batch = data.batch ?? '';
    this.courseCode = data.courseCode ?? '';
    this.courseName = data.courseName ?? '';
    this.section = data.section ?? '';
    this.attDate = data.attDate ?? '';
    this.attHour = data.attHour ?? '';
    this.subjectName = data.subjectName ?? '';
    this.subjectId = data.subjectId ?? 0;
    this.staffCode = data.staffCode ?? 0;
    this.departmentCode = data.departmentCode ?? '';
    this.staffName = data.staffName ?? '';
    this.entryBy = data.entryBy ?? '';
    this.entryDate = data.entryDate ?? '';
    this.modifiedBy = data.modifiedBy ?? '';
    this.modifiedDate = data.modifiedDate ?? '';
    this.guid = data.guid ?? '';
  }
}
