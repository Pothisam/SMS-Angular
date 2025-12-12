export class ConcessionReportRequestModel {
  courseType: string;
  batch: string;
  scholarshipType: string;
  semester: string;

  constructor(data: Partial<ConcessionReportRequestModel> = {}) {
    this.courseType = data.courseType || '';
    this.batch = data.batch || '';
    this.scholarshipType = data.scholarshipType || '';
    this.semester = data.semester || '';
  }
}

export class ConcessionReportResponseModel {
  sysId: number;
  name: string;
  studentId: string;
  rollNo: string;
  admissionNumber: string;
  departmentName: string;
  courseWithYearAndSection: string;
  scholarshipType: string;
  remark: string;
  semester: string;
  concessionAmount: number;

  constructor(data: Partial<ConcessionReportResponseModel> = {}) {
    this.sysId = data.sysId || 0;
    this.name = data.name || '';
    this.studentId = data.studentId || '';
    this.rollNo = data.rollNo || '';
    this.admissionNumber = data.admissionNumber || '';
    this.departmentName = data.departmentName || '';
    this.courseWithYearAndSection = data.courseWithYearAndSection || '';
    this.scholarshipType = data.scholarshipType || '';
    this.remark = data.remark || '';
    this.semester = data.semester || '';
    this.concessionAmount = data.concessionAmount || 0;
  }
}
