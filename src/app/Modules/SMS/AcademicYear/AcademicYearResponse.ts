export class AcademicYearResponse {
  sysId: number;
  yearDate: Date;
  year: string;
  status: string;
  enteredBy: string;
  entryDate: Date;
  modifiedBy: string | null;
  modifiedDate: Date;

  constructor(init?: Partial<AcademicYearResponse>) {
    this.sysId = init?.sysId ?? 0;
    this.yearDate = init?.yearDate ? new Date(init.yearDate) : new Date();
    this.year = init?.year ?? '';
    this.status = init?.status ?? '';
    this.enteredBy = init?.enteredBy ?? '';
    this.entryDate = init?.entryDate ? new Date(init.entryDate) : new Date();
    this.modifiedBy = init?.modifiedBy ?? null;
    this.modifiedDate = init?.modifiedDate ? new Date(init.modifiedDate) : new Date();
  }
}
