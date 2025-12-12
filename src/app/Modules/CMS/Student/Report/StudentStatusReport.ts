export class StudentStatusReportRequestModel {
  courseType: string;
  batch: string;
  status: string;

  constructor(data?: Partial<StudentStatusReportRequestModel>) {
    this.courseType = data?.courseType || '';
    this.batch = data?.batch || '';
    this.status = data?.status || 'Active';
  }
}

export class StudentStatusReportResponseModel {
  sysId: number;
  applicationNumber: string;
  admissionNumber: string;
  rollNo: string | null;
  name: string;
  departmentName: string;
  courseWithYearAndSection: string;
  batch: string;
  aadharCardNo: string;
  mobileNo: string;
  emailId: string;
  enteredBy: string;
  entryDate: string;
  modifiedBy: string;
  modifiedDate: string;
  section: string;
  status: string;
  guid: string;

  constructor(data?: Partial<StudentStatusReportResponseModel>) {
    this.sysId = data?.sysId || 0;
    this.applicationNumber = data?.applicationNumber || '';
    this.admissionNumber = data?.admissionNumber || '';
    this.rollNo = data?.rollNo || null;
    this.name = data?.name || '';
    this.departmentName = data?.departmentName || '';
    this.courseWithYearAndSection = data?.courseWithYearAndSection || '';
    this.batch = data?.batch || '';
    this.aadharCardNo = data?.aadharCardNo || '';
    this.mobileNo = data?.mobileNo || '';
    this.emailId = data?.emailId || '';
    this.enteredBy = data?.enteredBy || '';
    this.entryDate = data?.entryDate || '';
    this.modifiedBy = data?.modifiedBy || '';
    this.modifiedDate = data?.modifiedDate || '';
    this.section = data?.section || '';
    this.status = data?.status || '';
    this.guid = data?.guid || '';
  }
}
