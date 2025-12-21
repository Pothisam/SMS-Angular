export class InstitutionRequest {
  institutionName: string;
  address1: string;
  address2: string;
  pincode: string;
  postofficeName: string;
  districtname: string;
  stateName: string;
  emailid: string;
  mobileNumer: string;
  alternateMobileNumer: string;
  landline: string;
  institutionType: string;
  staffIdprefix: string;
  entredBy: string;
  modifiedBy: string;
  modifiedDate: string;
  website: string;

  constructor(init?: Partial<InstitutionRequest>) {
    this.institutionName = init?.institutionName ?? '';
    this.address1 = init?.address1 ?? '';
    this.address2 = init?.address2 ?? '';
    this.pincode = init?.pincode ?? '';
    this.postofficeName = init?.postofficeName ?? '';
    this.districtname = init?.districtname ?? '';
    this.stateName = init?.stateName ?? '';
    this.emailid = init?.emailid ?? '';
    this.mobileNumer = init?.mobileNumer ?? '';
    this.alternateMobileNumer = init?.alternateMobileNumer ?? '';
    this.landline = init?.landline ?? '';
    this.institutionType = init?.institutionType ?? '';
    this.staffIdprefix = init?.staffIdprefix ?? '';
    this.entredBy = init?.entredBy ?? '';
    this.modifiedBy = init?.modifiedBy ?? '';
    this.modifiedDate = init?.modifiedDate ?? '';
    this.website = init?.website ?? '';
  }
}

export class Postoffice {
  pincode: string;

  constructor(init?: Partial<Postoffice>) {
    this.pincode = init?.pincode ?? '';
  }
}
