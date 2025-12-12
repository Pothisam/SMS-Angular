export interface ISectionRequest {
  departmentCode: string;
}
export interface ISectionRequestList {
  courseCode: string;
}
export interface ISectionResponse {
  sysId: string;
  departmentName: string;
  courseNameBD: string;
  courseCode: string;
  section: string;
  status: string;
  enteredBy: string;
  entryDate: string;
  modifiedBy: string;
  modifiedDate: string;
}
