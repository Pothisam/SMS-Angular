export class AdmissionReportRequestModel {
  courseType?: string;
  batch?: string;
  date?: string;

  constructor(data?: Partial<AdmissionReportRequestModel>) {
    this.courseType = data?.courseType;
    this.batch = data?.batch;
    this.date = data?.date;
  }
}

export class AdmissionReportResponseModel {
  applicationNumber: string;
  admissionNumber: string;
  rollNo: string | null;
  name: string;
  departmentName: string;
  courseWithYearandSection: string;
  batch: string;
  aadharCardNo: string;
  mobileNo: string;
  emailId: string;
  enteredBy: string;
  entryDate: string;
  modifiedBy: string | null;
  modifiedDate: string;
  section: string;
  guid: string | null;

  constructor(data: Partial<AdmissionReportResponseModel>) {
    this.applicationNumber = data.applicationNumber || '';
    this.admissionNumber = data.admissionNumber || '';
    this.rollNo = data.rollNo || null;
    this.name = data.name || '';
    this.departmentName = data.departmentName || '';
    this.courseWithYearandSection = data.courseWithYearandSection || '';
    this.batch = data.batch || '';
    this.aadharCardNo = data.aadharCardNo || '';
    this.mobileNo = data.mobileNo || '';
    this.emailId = data.emailId || '';
    this.enteredBy = data.enteredBy || '';
    this.entryDate = data.entryDate || '';
    this.modifiedBy = data.modifiedBy || null;
    this.modifiedDate = data.modifiedDate || '';
    this.section = data.section || '';
    this.guid = data.guid || null;
  }
}
