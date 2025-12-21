export class ClassSectionRequest {
  classFkid: number;

  constructor(init?: Partial<ClassSectionRequest>) {
    this.classFkid = init?.classFkid ?? 0;
  }
}
