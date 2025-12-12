export class InsertStaffInchargeRequest {
  staffCode: number;
  courseType: string;
  courseCode: string;
  batch: string;
  section: string;
  name: string;

  constructor(data: Partial<InsertStaffInchargeRequest> = {}) {
    this.staffCode = data.staffCode ?? 0;
    this.courseType = data.courseType ?? '';
    this.courseCode = data.courseCode ?? '';
    this.batch = data.batch ?? '';
    this.section = data.section ?? '';
    this.name = data.name ?? '';
  }
}
export class StaffInchargeResponse {
  sysid: number;
  name: string;
  batch: string;
  courseType: string;
  courseNameBD: string;
  courseCode: string;
  section: string;
  entrydate: string;
  entredBy: string;
  modifiedBy: string | null;
  modifiedDate: string;
  guid: string | null;
  classdetails: string;

  constructor(data: Partial<StaffInchargeResponse> = {}) {
    this.sysid = data.sysid ?? 0;
    this.name = data.name ?? '';
    this.batch = data.batch ?? '';
    this.courseType = data.courseType ?? '';
    this.courseNameBD = data.courseNameBD ?? '';
    this.courseCode = data.courseCode ?? '';
    this.section = data.section ?? '';
    this.entrydate = data.entrydate ?? '';
    this.entredBy = data.entredBy ?? '';
    this.modifiedBy = data.modifiedBy ?? null;
    this.modifiedDate = data.modifiedDate ?? '';
    this.guid = data.guid ?? null;
    this.classdetails = data.classdetails ?? '';
  }
}
