export class FeesDashboardRequest {
  academicYearSysId: number;

  constructor(init?: Partial<FeesDashboardRequest>) {
    this.academicYearSysId = init?.academicYearSysId ?? 0;
  }
}

export class FeesSummaryClassWiseResponse {
  classSysId: number;
  className: string;
  totalFeesAmount: number;
  feesAmountReceived: number;
  feesBalance: number;

  constructor(init?: Partial<FeesSummaryClassWiseResponse>) {
    this.classSysId = init?.classSysId ?? 0;
    this.className = init?.className ?? '';
    this.totalFeesAmount = init?.totalFeesAmount ?? 0;
    this.feesAmountReceived = init?.feesAmountReceived ?? 0;
    this.feesBalance = init?.feesBalance ?? 0;
  }
}
