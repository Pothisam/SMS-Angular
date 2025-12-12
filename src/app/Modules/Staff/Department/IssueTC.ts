export class TCListResponse {
  sysId: number;
  rollNo: string;
  name: string;
  dob: Date;
  departmentName: string;
  courseNameSD: string;
  mobileNo: string;
  mobileNo2: string;
  studentMobileNumber: string;
  tcReceivedDate: Date | null;
  guid: string | null;

  constructor(data?: Partial<TCListResponse>) {
    this.sysId = data?.sysId || 0;
    this.rollNo = data?.rollNo || '';
    this.name = data?.name || '';
    this.dob = data?.dob || new Date();
    this.departmentName = data?.departmentName || '';
    this.courseNameSD = data?.courseNameSD || '';
    this.mobileNo = data?.mobileNo || '';
    this.mobileNo2 = data?.mobileNo2 || '';
    this.studentMobileNumber = data?.studentMobileNumber || '';
    this.tcReceivedDate = data?.tcReceivedDate || null;
    this.guid = data?.guid || null;
  }
}
export class UpdateTCRequest {
  sysId: number;
  tcDate: string;

  constructor(data?: Partial<UpdateTCRequest>) {
    this.sysId = data?.sysId ?? 0;
    this.tcDate = data?.tcDate ?? '';
  }
}
