export class FeesDashboardRequest {
  academicYearSysId: number;

  constructor(init?: Partial<FeesDashboardRequest>) {
    this.academicYearSysId = init?.academicYearSysId ?? 0;
  }
}

/** One row per class + fees type, as returned by /Dashboard/GetFeesSummaryClassWise */
export class FeesSummaryClassWiseResponse {
  classSysId: number;
  className: string;
  feesTypeId: number;
  feesDescription: string;
  totalFeesAmount: number;
  feesAmountReceived: number;
  feesBalance: number;

  constructor(init?: Partial<FeesSummaryClassWiseResponse>) {
    this.classSysId = init?.classSysId ?? 0;
    this.className = init?.className ?? '';
    this.feesTypeId = init?.feesTypeId ?? 0;
    this.feesDescription = init?.feesDescription ?? '';
    this.totalFeesAmount = init?.totalFeesAmount ?? 0;
    this.feesAmountReceived = init?.feesAmountReceived ?? 0;
    this.feesBalance = init?.feesBalance ?? 0;
  }
}

/** Filter chip: key = feesTypeId, value = feesDescription */
export class FeesTypeFilter {
  feesTypeId: number;
  feesDescription: string;
  selected: boolean;

  constructor(feesTypeId: number, feesDescription: string, selected = true) {
    this.feesTypeId = feesTypeId;
    this.feesDescription = feesDescription;
    this.selected = selected;
  }
}
