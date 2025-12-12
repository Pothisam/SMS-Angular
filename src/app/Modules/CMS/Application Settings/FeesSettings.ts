export class FeesSettingsModal {
  EnableConcession: boolean;
  EnableScholarship: boolean;
  EnableRefund: boolean;
  EnableDeleteRecord: boolean;

  constructor(data: Partial<FeesSettingsModal> | null = null) {
    this.EnableConcession = data?.EnableConcession ?? false;
    this.EnableScholarship = data?.EnableScholarship ?? false;
    this.EnableRefund = data?.EnableRefund ?? false;
    this.EnableDeleteRecord = data?.EnableDeleteRecord ?? false;
  }
}
