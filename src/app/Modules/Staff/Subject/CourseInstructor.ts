export class AddCourseInstructorRequest {
  courseType: string;
  batch: string;
  courseCode: string;
  section: string;
  semester: string;
  subjectId: number;
  staffCode: number;
  staffName: string;
  onlyActive: boolean;
  constructor(data?: Partial<AddCourseInstructorRequest>) {
    this.courseType = data?.courseType || '';
    this.batch = data?.batch || '';
    this.courseCode = data?.courseCode || '';
    this.section = data?.section || '';
    this.semester = data?.semester || '';
    this.subjectId = data?.subjectId ?? 0;
    this.staffCode = data?.staffCode ?? 0;
    this.staffName = data?.staffName || '';
    this.onlyActive = data?.onlyActive ?? false;
  }
}
export class CourseInstructorResponse {
  sysid: number;
  subjectId: number;
  staffDepartmentCode: string;
  staffID: number;
  batch: string;
  courseNameSD: string;
  section: string;
  semester: string;
  subjectName: string;
  subjectCode: string;
  subjectCredit: number;
  subjectType: string;
  staffName: string;
  status: string;
  entredBy: string;
  entryDate: Date;
  modifiedBy: string;
  modifiedDate: Date;

  constructor(data?: Partial<CourseInstructorResponse>) {
    this.sysid = data?.sysid ?? 0;
    this.subjectId = data?.subjectId ?? 0;
    this.staffDepartmentCode = data?.staffDepartmentCode || '';
    this.staffID = data?.staffID ?? 0;
    this.batch = data?.batch || '';
    this.courseNameSD = data?.courseNameSD || '';
    this.section = data?.section || '';
    this.semester = data?.semester || '';
    this.subjectName = data?.subjectName || '';
    this.subjectCode = data?.subjectCode || '';
    this.subjectCredit = data?.subjectCredit ?? 0;
    this.subjectType = data?.subjectType || '';
    this.staffName = data?.staffName || '';
    this.status = data?.status || '';
    this.entredBy = data?.entredBy || '';
    this.entryDate = data?.entryDate ? new Date(data.entryDate) : new Date();
    this.modifiedBy = data?.modifiedBy || '';
    this.modifiedDate = data?.modifiedDate ? new Date(data.modifiedDate) : new Date();
  }
}
export class UpdateCourseInstructorRequest {
  sysid: number;
  staffID: number;

  constructor(data?: Partial<UpdateCourseInstructorRequest>) {
    this.sysid = data?.sysid ?? 0;
    this.staffID = data?.staffID ?? 0;
  }
}
