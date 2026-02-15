export class AddFeesTypeRequest {
  feesTypeDescription: string;

  constructor(init?: Partial<AddFeesTypeRequest>) {
    this.feesTypeDescription = init?.feesTypeDescription ?? '';
  }
}
export class FeesTypeListResponse {
  public sysid: number;
  public feesDescription: string;
  public entryby: string;
  public entryDate: Date | null;
  public modifiedby: string;
  public modifiedDate: Date | null;

  constructor(init?: Partial<FeesTypeListResponse>) {
    this.sysid = init?.sysid ?? 0;
    this.feesDescription = init?.feesDescription ?? '';
    this.entryby = init?.entryby ?? '';
    this.entryDate = init?.entryDate ?? null;
    this.modifiedby = init?.modifiedby ?? '';
    this.modifiedDate = init?.modifiedDate ?? null;
  }
}
