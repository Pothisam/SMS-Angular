export class TransferCertificateReportRequestModel {
  courseType: string;
  batch: string;
  courseCode: string;
  section: string;
  type: string;
  dol: string;
  date: string;
  private _dte: Date = new Date();
  private _currentDate: string =
    this._dte.getFullYear() +
    '-' +
    String(this._dte.getMonth() + 1).padStart(2, '0') +
    '-' +
    String(this._dte.getDate()).padStart(2, '0');

  constructor(data?: Partial<TransferCertificateReportRequestModel>) {
    this.courseType = data?.courseType || '';
    this.batch = data?.batch || '';
    this.courseCode = data?.courseCode || '';
    this.section = data?.section || '';
    this.type = data?.type || 'ORIGNAL';
    this.dol = this._currentDate;
    this.date = this._currentDate;
  }
}

export class TransferCertificateReportResponseModel {
  id: number;
  stdid: string;
  name: string;
  rollNo: string | null;
  dob: Date;
  departmentName: string;
  departmentCode: string;
  courseNameSD: string;
  courseCode: string;
  section: string;
  batch: string;
  semester: string;
  balance: number;
  status: string;
  mobileNo: string;
  mobileNo2: string | null;
  studentMobileNumber: string | null;

  constructor(data?: Partial<TransferCertificateReportResponseModel>) {
    this.id = data?.id || 0;
    this.stdid = data?.stdid || '';
    this.name = data?.name || '';
    this.rollNo = data?.rollNo || null;
    this.dob = data?.dob ? new Date(data.dob) : new Date();
    this.departmentName = data?.departmentName || '';
    this.departmentCode = data?.departmentCode || '';
    this.courseNameSD = data?.courseNameSD || '';
    this.courseCode = data?.courseCode || '';
    this.section = data?.section || '';
    this.batch = data?.batch || '';
    this.semester = data?.semester || '';
    this.balance = data?.balance || 0;
    this.status = data?.status || '';
    this.mobileNo = data?.mobileNo || '';
    this.mobileNo2 = data?.mobileNo2 || null;
    this.studentMobileNumber = data?.studentMobileNumber || null;
  }
}
