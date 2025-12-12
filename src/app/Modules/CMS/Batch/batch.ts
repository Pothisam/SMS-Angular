export interface IAddBatchRequest {
  fromDate: string;
  toDate: string;
  courseType: string;
}
export interface ISemesterResponse {
  value: string;
  text: string;
}
export interface ISemesterupdateRequest {
  sysid: number;
  semester: string;
}
export interface IBatchStatusRequest {
  sysid: number;
  status: string;
}
export class IBatchDetailsResponse {
  sysid: number;
  academicYear: string;
  semester: string;
  degreeType: string;
  fromDate: string;
  toDate: string;
  status: string;
  batchStatus: string;
  entredBy: string | null;
  entrydate: string;
  modifiedBy: string;
  modifiedDate: string;

  constructor(data: any) {
    this.sysid = data.sysid;
    this.academicYear = data.academicYear;
    this.semester = data.semester;
    this.degreeType = data.degreeType;
    this.fromDate = data.fromDate;
    this.toDate = data.toDate;
    this.status = data.status;
    this.batchStatus = data.batchStatus;
    this.entredBy = data.entredBy;
    this.entrydate = data.entrydate;
    this.modifiedBy = data.modifiedBy;
    this.modifiedDate = data.modifiedDate;
  }
}
