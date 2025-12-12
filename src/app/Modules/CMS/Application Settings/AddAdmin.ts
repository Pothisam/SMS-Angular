export class AddAdminResponse {
  sysid: number;
  fidstaff: number;
  name: string;
  otherSettings: string;
  allowLogin: string;
  institutionCode: number;
  enterBy: string;
  entrydate: string;
  modifiedBy: string;
  modifiedDate: string;
  departmentCode: string;
  guid: string | null;

  constructor(data: Partial<AddAdminResponse> = {}) {
    this.sysid = data.sysid ?? 0;
    this.fidstaff = data.fidstaff ?? 0;
    this.name = data.name ?? '';
    this.otherSettings = data.otherSettings ?? '';
    this.allowLogin = data.allowLogin ?? 'No';
    this.institutionCode = data.institutionCode ?? 0;
    this.enterBy = data.enterBy ?? '';
    this.entrydate = data.entrydate ?? '';
    this.modifiedBy = data.modifiedBy ?? '';
    this.modifiedDate = data.modifiedDate ?? '';
    this.departmentCode = data.departmentCode ?? '';
    this.guid = data.guid ?? null;
  }
}

export class AdminRequestModal {
  fid: number;
  allowLogin: string;
  otherSettings: string;

  constructor(data: Partial<AdminRequestModal> = {}) {
    this.fid = data.fid ?? 0;
    this.allowLogin = data.allowLogin ?? 'No';
    this.otherSettings = data.otherSettings ?? '';
  }
}
