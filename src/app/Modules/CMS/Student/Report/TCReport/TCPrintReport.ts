export class TCReportRequestModel {
  courseType: string;
  batch: string;
  courseCode: string;
  section: string;

  constructor(data?: Partial<TCReportRequestModel>) {
    this.courseType = data?.courseType || '';
    this.batch = data?.batch || '';
    this.courseCode = data?.courseCode || '';
    this.section = data?.section || '';
  }
}

export class TransferCertificateReportResponseModel {
  studentName: string;
  fatherName: string;
  nationality: string;
  community: string;
  dob: string;
  dateOfAdmission: string;
  departmentName: string;
  courseYear: string;
  courseName: string;
  address: string;
  institutionName: string;
  admissionNumber: string;
  admissionSerialNumber: string;
  rollNo: string;
  gender: string;
  landline: string;
  firstLanguage: string;
  website: string;
  dobToWord: string;
  emisno: string;

  constructor(data?: Partial<TransferCertificateReportResponseModel>) {
    this.studentName = data?.studentName || '';
    this.fatherName = data?.fatherName || '';
    this.nationality = data?.nationality || '';
    this.community = data?.community || '';
    this.dob = data?.dob || '';
    this.dateOfAdmission = data?.dateOfAdmission || '';
    this.departmentName = data?.departmentName || '';
    this.courseYear = data?.courseYear || '';
    this.courseName = data?.courseName || '';
    this.address = data?.address || '';
    this.institutionName = data?.institutionName || '';
    this.admissionNumber = data?.admissionNumber || '';
    this.admissionSerialNumber = data?.admissionSerialNumber || '';
    this.rollNo = data?.rollNo || '';
    this.gender = data?.gender || '';
    this.landline = data?.landline || '';
    this.firstLanguage = data?.firstLanguage || '';
    this.website = data?.website || '';
    this.dobToWord = data?.dobToWord || '';
    this.emisno = data?.emisno || '';
  }
}
