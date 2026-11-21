/** One row per student + fees type, as returned by /StudentFeesTransaction/GetFeesDetailsByClassWithFeesType */
export class FeesBalanceReportResponse {
  sysId: number;
  stdid: string;
  rollno: string;
  name: string;
  initial: string;
  className: string;
  sectionName: string;
  year: string;
  acadamicYear: number;
  classSectionSysId: number;
  feesTypeId: number;
  feesDescription: string;
  debit: number;
  credit: number;
  balance: number;

  constructor(init?: Partial<FeesBalanceReportResponse>) {
    this.sysId = init?.sysId ?? 0;
    this.stdid = init?.stdid ?? '';
    this.rollno = init?.rollno ?? '';
    this.name = init?.name ?? '';
    this.initial = init?.initial ?? '';
    this.className = init?.className ?? '';
    this.sectionName = init?.sectionName ?? '';
    this.year = init?.year ?? '';
    this.acadamicYear = init?.acadamicYear ?? 0;
    this.classSectionSysId = init?.classSectionSysId ?? 0;
    this.feesTypeId = init?.feesTypeId ?? 0;
    this.feesDescription = init?.feesDescription ?? '';
    this.debit = init?.debit ?? 0;
    this.credit = init?.credit ?? 0;
    this.balance = init?.balance ?? 0;
  }
}
