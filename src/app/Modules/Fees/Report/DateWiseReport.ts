export class FeesReportRequest {
  fromDate: string;
  toDate: string;
  feesTypeFkid: string;

  constructor(init?: Partial<FeesReportRequest>) {
    this.fromDate = init?.fromDate ?? '';
    this.toDate = init?.toDate ?? '';
    this.feesTypeFkid = init?.feesTypeFkid ?? '';
  }
}
export class FeesReportResponse {
  sysId: number;
  rollNo: string;
  name: string;
  stdid: string;
  acadamicYear: string;
  className: string;
  sectionName: string;
  description: string;
  generateDate: string;
  credit: number;
  dob: Date;
  recicptNo: string;
  createdby: string;
  feesDescription: string;

  constructor(init?: Partial<FeesReportResponse>) {
    this.sysId = init?.sysId ?? 0;
    this.rollNo = init?.rollNo ?? '';
    this.name = init?.name ?? '';
    this.stdid = init?.stdid ?? '';
    this.acadamicYear = init?.acadamicYear ?? '';
    this.className = init?.className ?? '';
    this.sectionName = init?.sectionName ?? '';
    this.description = init?.description ?? '';
    this.generateDate = init?.generateDate ?? '';
    this.credit = init?.credit ?? 0;
    this.dob = init?.dob ? new Date(init.dob) : new Date();
    this.recicptNo = init?.recicptNo ?? '';
    this.createdby = init?.createdby ?? '';
    this.feesDescription = init?.feesDescription ?? '';
  }
}
