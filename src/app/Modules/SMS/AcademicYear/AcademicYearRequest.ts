export class AddAcademicYearRequest {
  yearDate: Date;
  year: string;

  constructor(init?: Partial<AddAcademicYearRequest>) {
    this.yearDate = init?.yearDate ?? new Date();
    this.year = init?.year ?? '';
  }
}
