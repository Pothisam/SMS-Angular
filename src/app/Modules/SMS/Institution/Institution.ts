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
export class UpdateInstitutionLogoRequest {
  sysid: number;
  logoFileName: string;
  logoContentType: string;
  logoData: Uint8Array | null;

  constructor(init?: Partial<UpdateInstitutionLogoRequest>) {
    this.sysid = init?.sysid ?? 0;
    this.logoFileName = init?.logoFileName ?? '';
    this.logoContentType = init?.logoContentType ?? '';
    this.logoData = init?.logoData ?? null;
  }
}
export class UpdateInstitutionLogoWithTextRequest {
  sysid: number;
  logoWithTextFileName: string;
  logoWithTextContentType: string;
  logoWithTextData: string;

  constructor(init?: Partial<UpdateInstitutionLogoWithTextRequest>) {
    this.sysid = init?.sysid ?? 0;
    this.logoWithTextFileName = init?.logoWithTextFileName ?? '';
    this.logoWithTextContentType = init?.logoWithTextContentType ?? '';
    this.logoWithTextData = init?.logoWithTextData ?? '';
  }
}
export class UpdateInstitutionFaviconRequest {
  sysid: number;
  faviconFileName: string;
  faviconContentType: string;
  faviconData: string;

  constructor(init?: Partial<UpdateInstitutionFaviconRequest>) {
    this.sysid = init?.sysid ?? 0;
    this.faviconFileName = init?.faviconFileName ?? '';
    this.faviconContentType = init?.faviconContentType ?? '';
    this.faviconData = init?.faviconData ?? '';
  }
}
