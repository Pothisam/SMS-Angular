export interface ICourseResponse {
  courseCode: string;
  courseDurationBD: string;
  courseNameBD: string;
  courseNameSD: string;
  courseType: string;
  departmentName: string;
  status: string;
  entredBy: string;
  entrydate: string;
  modifiedBy: string;
  modifiedDate: string;
}
export interface IAddCourseRequest {
  courseNameSD: string;
  courseNameBD: string;
  courseYearSD: string;
  courseYearBD: string;
  departmentName: string;
  departmentCode: string;
  courseType: string;
  courseTypeBD: string;
}
export class CourseDetailsRequest {
  courseCode: string;
  constructor(data?: Partial<CourseDetailsRequest>) {
    this.courseCode = data?.courseCode ?? '';
  }
}
export class CourseDetailResponse {
  courseNameSD: string;
  courseNameBD: string;
  courseCode: string;
  departmentName: string;
  departmentCode: string;

  constructor(init?: Partial<CourseDetailResponse>) {
    this.courseNameSD = init?.courseNameSD ?? '';
    this.courseNameBD = init?.courseNameBD ?? '';
    this.courseCode = init?.courseCode ?? '';
    this.departmentName = init?.departmentName ?? '';
    this.departmentCode = init?.departmentCode ?? '';
  }
}
