export class ClassSectionResponse {
  sysId: number;
  classFkid: number;
  className: string;
  sectionName: string;
  enteredBy: string;
  entryDate: string;
  modifiedBy: string | null;
  modifiedDate: string;

  constructor(init?: Partial<ClassSectionResponse>) {
    this.sysId = init?.sysId ?? 0;
    this.classFkid = init?.classFkid ?? 0;
    this.className = init?.className ?? '';
    this.sectionName = init?.sectionName ?? '';
    this.enteredBy = init?.enteredBy ?? '';
    this.entryDate = init?.entryDate ?? '';
    this.modifiedBy = init?.modifiedBy ?? null;
    this.modifiedDate = init?.modifiedDate ?? '';
  }
}
