export class TimeSheetRequest {
  courseType: string;
  batch: string;
  courseCode: string;
  section: string;
  semester: string;
  onlyActive: boolean;
  status: string;
  constructor(data: Partial<TimeSheetRequest> = {}) {
    this.courseType = data.courseType ?? '';
    this.batch = data.batch ?? '';
    this.courseCode = data.courseCode ?? '';
    this.section = data.section ?? '';
    this.semester = data.semester ?? '';
    this.onlyActive = data.onlyActive ?? true;
    this.status = data.status ?? '';
  }
}
export class InsertUpdateTimeSheetRequest {
  Sysid: number;
  courseType: string;
  batch: string;
  courseCode: string;
  section: string;
  semester: string;
  dayOrder: number;
  attendanceHours: number;
  hour1SubjectSysid: number;
  hour2SubjectSysid: number;
  hour3SubjectSysid: number;
  hour4SubjectSysid: number;
  hour5SubjectSysid: number;
  hour6SubjectSysid: number;
  status: string;
  constructor(data: Partial<InsertUpdateTimeSheetRequest> = {}) {
    this.Sysid = data.Sysid ?? 0;
    this.courseType = data.courseType ?? '';
    this.batch = data.batch ?? '';
    this.courseCode = data.courseCode ?? '';
    this.section = data.section ?? '';
    this.semester = data.semester ?? '';
    this.dayOrder = data.dayOrder ?? 0;
    this.attendanceHours = data.attendanceHours ?? 0;
    this.hour1SubjectSysid = data.hour1SubjectSysid ?? 0;
    this.hour2SubjectSysid = data.hour2SubjectSysid ?? 0;
    this.hour3SubjectSysid = data.hour3SubjectSysid ?? 0;
    this.hour4SubjectSysid = data.hour4SubjectSysid ?? 0;
    this.hour5SubjectSysid = data.hour5SubjectSysid ?? 0;
    this.hour6SubjectSysid = data.hour6SubjectSysid ?? 0;
    this.status = data.status ?? '';
  }
}
