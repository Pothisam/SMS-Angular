export class StudentFeesTransactionRequest {
  batch: number;
  class: number;
  section: number;

  constructor(init?: Partial<StudentFeesTransactionRequest>) {
    this.batch = init?.batch ?? 0;
    this.class = init?.class ?? 0;
    this.section = init?.section ?? 0;
  }
}
export class StudentFeesTransactionResponse {
  sysId: number;
  stdid: string;
  rollno: string;
  name: string;
  initial: string;
  className: string;
  sectionName: string;
  year: string;
  debit: number;
  credit: number;
  balance: number;
  acadamicYear: number;
  classSectionSysId: number;

  constructor(init?: Partial<StudentFeesTransactionResponse>) {
    this.sysId = init?.sysId ?? 0;
    this.stdid = init?.stdid ?? '';
    this.rollno = init?.rollno ?? '';
    this.name = init?.name ?? '';
    this.initial = init?.initial ?? '';
    this.className = init?.className ?? '';
    this.sectionName = init?.sectionName ?? '';
    this.year = init?.year ?? '';
    this.debit = init?.debit ?? 0;
    this.credit = init?.credit ?? 0;
    this.balance = init?.balance ?? 0;
    this.acadamicYear = init?.acadamicYear ?? 0;
    this.classSectionSysId = init?.classSectionSysId ?? 0;
  }
}
export class StudentFeesTransactionByNameRequest {
  studentName: string;

  constructor(init?: Partial<StudentFeesTransactionByNameRequest>) {
    this.studentName = init?.studentName ?? '';
  }
}
export class SessionClass {
  sysId: number;
  batch: number;
  studentClassDetailsFkid: number;

  constructor(init?: Partial<SessionClass>) {
    this.sysId = init?.sysId ?? 0;
    this.batch = init?.batch ?? 0;
    this.studentClassDetailsFkid = init?.studentClassDetailsFkid ?? 0;
  }
}
export class StudentFeesdebitResponse {
  sysId: number;
  entryDate: Date;
  description: string;
  debit: number;
  status: string;
  entryBy: string;
  modifiedBy: string;
  modifiedDate: Date;
  generateDate: Date;
  feesId: number;

  constructor(init?: Partial<StudentFeesdebitResponse>) {
    this.sysId = init?.sysId ?? 0;
    this.entryDate = init?.entryDate ? new Date(init.entryDate) : new Date();
    this.description = init?.description ?? '';
    this.debit = init?.debit ?? 0;
    this.status = init?.status ?? '';
    this.entryBy = init?.entryBy ?? '';
    this.modifiedBy = init?.modifiedBy ?? '';
    this.modifiedDate = init?.modifiedDate ? new Date(init.modifiedDate) : new Date();
    this.generateDate = init?.generateDate ? new Date(init.generateDate) : new Date();
    this.feesId = init?.feesId ?? 0;
  }
}
export class StudentFeescreditResponse {
  sysId: number;
  entryDate: Date;
  description: string;
  credit: number;
  status: string;
  entryBy: string;
  modifiedBy: string;
  modifiedDate: Date;
  generateDate: Date;
  feesId: number;

  constructor(init?: Partial<StudentFeescreditResponse>) {
    this.sysId = init?.sysId ?? 0;
    this.entryDate = init?.entryDate ? new Date(init.entryDate) : new Date();
    this.description = init?.description ?? '';
    this.credit = init?.credit ?? 0;
    this.status = init?.status ?? '';
    this.entryBy = init?.entryBy ?? '';
    this.modifiedBy = init?.modifiedBy ?? '';
    this.modifiedDate = init?.modifiedDate ? new Date(init.modifiedDate) : new Date();
    this.generateDate = init?.generateDate ? new Date(init.generateDate) : new Date();
    this.feesId = init?.feesId ?? 0;
  }
}
export class StudentFeesTransactionAddRequest {
  studentFkid: number;
  feesTypeFkid: number;
  studentClassDetailsFkid: number;
  description: string;
  generateDate: string;
  amount: number;
  paymentMode: string;
  chequeNo: string;
  chequeDate: string;
  bankName: string;
  remark: string;

  constructor(init?: Partial<StudentFeesTransactionAddRequest>) {
    this.studentFkid = init?.studentFkid ?? 0;
    this.feesTypeFkid = init?.feesTypeFkid ?? 0;
    this.studentClassDetailsFkid = init?.studentClassDetailsFkid ?? 0;
    this.description = init?.description ?? '';
    this.generateDate = init?.generateDate ?? '';
    this.amount = init?.amount ?? 0;
    this.paymentMode = init?.paymentMode ?? '';
    this.chequeNo = init?.chequeNo ?? '';
    this.chequeDate = init?.chequeDate ?? '';
    this.bankName = init?.bankName ?? '';
    this.remark = init?.remark ?? '';
  }
}
