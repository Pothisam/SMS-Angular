export class ExportStaffDetailsRequestModule {
  Columns: string;

  constructor(data?: Partial<ExportStaffDetailsRequestModule>) {
    this.Columns = data?.Columns ?? '';
  }
}
