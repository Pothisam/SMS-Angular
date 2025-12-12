export class StaffLoginDetails {
  sysid: number;
  departmentName: string;
  departmentCode: string;
  designation: string;
  designationCode: number;

  constructor(data: Partial<StaffLoginDetails> = {}) {
    this.sysid = data.sysid ?? 0;
    this.departmentName = data.departmentName ?? '';
    this.departmentCode = data.departmentCode ?? '';
    this.designation = data.designation ?? '';
    this.designationCode = data.designationCode ?? 0;
  }
}
