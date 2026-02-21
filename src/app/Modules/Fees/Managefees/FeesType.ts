export class AddFeesTypeRequest {
  feesTypeDescription: string;

  constructor(init?: Partial<AddFeesTypeRequest>) {
    this.feesTypeDescription = init?.feesTypeDescription ?? '';
  }
}
export class FeesTypeListResponse {
  public sysid: number;
  public feesDescription: string;
  public entryby: string;
  public entryDate: Date | null;
  public modifiedby: string;
  public modifiedDate: Date | null;

  constructor(init?: Partial<FeesTypeListResponse>) {
    this.sysid = init?.sysid ?? 0;
    this.feesDescription = init?.feesDescription ?? '';
    this.entryby = init?.entryby ?? '';
    this.entryDate = init?.entryDate ?? null;
    this.modifiedby = init?.modifiedby ?? '';
    this.modifiedDate = init?.modifiedDate ?? null;
  }
}
export class GetFeesGentrationRequest {
  public acadamicYear: number;
  public classfkid: number;
  public sectionfkid: number;
  public feestypefkid: number;
  public amount: number;

  constructor(init?: Partial<GetFeesGentrationRequest>) {
    this.acadamicYear = init?.acadamicYear ?? 0;
    this.classfkid = init?.classfkid ?? 0;
    this.sectionfkid = init?.sectionfkid ?? 0;
    this.feestypefkid = init?.feestypefkid ?? 0;
    this.amount = init?.amount ?? 0;
  }
}
export class StudentFeeGenerateStatusResponse {
  public sysid: number;
  public studentName: string;
  public stdid: string;
  public className: string;
  public sectionName: string;
  public hostel: string;
  public year: string;
  public debit: number;
  public status: string;

  constructor(init?: Partial<StudentFeeGenerateStatusResponse>) {
    this.sysid = init?.sysid ?? 0;
    this.studentName = init?.studentName ?? '';
    this.stdid = init?.stdid ?? '';
    this.className = init?.className ?? '';
    this.sectionName = init?.sectionName ?? '';
    this.hostel = init?.hostel ?? '';
    this.year = init?.year ?? '';
    this.debit = init?.debit ?? 0;
    this.status = init?.status ?? '';
  }
}
