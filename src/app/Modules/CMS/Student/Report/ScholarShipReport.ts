export class ScholarShipReportRequestModel {
  courseType: string;
  batch: string;
  governmentSC: string;
  charitySC: string;
  managementSC: string;

  constructor(data?: Partial<ScholarShipReportRequestModel>) {
    this.courseType = data?.courseType || '';
    this.batch = data?.batch || '';
    this.governmentSC = data?.governmentSC || '';
    this.charitySC = data?.charitySC || '';
    this.managementSC = data?.managementSC || '';
  }
}

export class ScholarShipReportResponseModel {
  rollNo: number | null;
  studentId: string;
  name: string;
  departmentName: string;
  courseWithYearAndSection: string;
  scholarshipType: string;
  charityScholarship: string;
  charityAmount: number;
  managementScholarship: string;

  constructor(data?: Partial<ScholarShipReportResponseModel>) {
    this.rollNo = data?.rollNo ?? null;
    this.studentId = data?.studentId || '';
    this.name = data?.name || '';
    this.departmentName = data?.departmentName || '';
    this.courseWithYearAndSection = data?.courseWithYearAndSection || '';
    this.scholarshipType = data?.scholarshipType || '';
    this.charityScholarship = data?.charityScholarship || '';
    this.charityAmount = data?.charityAmount ?? 0.0;
    this.managementScholarship = data?.managementScholarship || '';
  }
}
