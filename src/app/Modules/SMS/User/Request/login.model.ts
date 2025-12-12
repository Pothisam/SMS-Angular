export interface ILoginRequest {
  userName: string;
  password: string;
}
export interface IAutoCompleateRequest {
  columnName: string | undefined;
  searchParam: string | undefined;
}
export interface IDepartmentResponse {
  departmentName: string;
  departmentCode: string;
  status: string;
}

export interface IStaffTypeResponse {
  staffType: string;
  count: string;
}

export interface IDepartmentNameResponse {
  departmentName: string;
  count: string;
}
export interface IBatchResponse {
  batch: string;
  count: string;
}
export interface IClassResponse {
  courseWithYearandSection: string;
  count: string;
}
export interface IGtoupInstitutionResponse {
  sysid: number;
  institutionName: string;
  emailid: string;
  mobileNumer: string;
  landline: string;
  entredBy: string | null;
  entrydate: string; // or Date if you're parsing it
  modifiedBy: string | null;
  modifiedDate: string; // or Date
}
export interface IChangeInstitutionRequest {
  institutionCode: number;
}
