export class ClassResponse {
  sysId: number;
  className: string;
  status: string;
  enteredBy: string;
  entryDate: string;
  modifiedBy: string | null;
  modifiedDate: string;

  constructor(init?: Partial<ClassResponse>) {
    this.sysId = init?.sysId ?? 0;
    this.className = init?.className ?? '';
    this.status = init?.status ?? '';
    this.enteredBy = init?.enteredBy ?? '';
    this.entryDate = init?.entryDate ?? '';
    this.modifiedBy = init?.modifiedBy ?? null;
    this.modifiedDate = init?.modifiedDate ?? '';
  }
}
