export class StudentFeeGenerateRequest {
  sysid: number;
  studentClassDetailsFkid: number;
  acadamicyearFkid: number;
  feesTypeFkid: number;
  courseName: string;
  section: string;
  acadamicYear: string;
  description: string;
  generateDate: Date;
  debit: number;

  constructor(init?: Partial<StudentFeeGenerateRequest>) {
    this.sysid = init?.sysid ?? 0;
    this.studentClassDetailsFkid = init?.studentClassDetailsFkid ?? 0;
    this.acadamicyearFkid = init?.acadamicyearFkid ?? 0;
    this.feesTypeFkid = init?.feesTypeFkid ?? 0;
    this.courseName = init?.courseName ?? '';
    this.section = init?.section ?? '';
    this.acadamicYear = init?.acadamicYear ?? '';
    this.description = init?.description ?? '';
    this.generateDate = init?.generateDate ?? new Date();
    this.debit = init?.debit ?? 0;
  }
}
export class GetFeesGenerationRequest {
  academicYearSysId: number;
  classSectionId: number;
  feesTypeFkid: number;
  gDate: Date;

  constructor(init?: Partial<GetFeesGenerationRequest>) {
    this.academicYearSysId = init?.academicYearSysId ?? 0;
    this.classSectionId = init?.classSectionId ?? 0;
    this.feesTypeFkid = init?.feesTypeFkid ?? 0;
    this.gDate = init?.gDate ?? new Date();
  }
}
export class StudentFeeGenerateStatusResponse {
  sysId: number;
  name: string;
  stdId: string;
  acadamicYear: string;
  description: string;
  generateDate: Date;
  debit: number;

  constructor(init?: Partial<StudentFeeGenerateStatusResponse>) {
    this.sysId = init?.sysId ?? 0;
    this.name = init?.name ?? '';
    this.stdId = init?.stdId ?? '';
    this.acadamicYear = init?.acadamicYear ?? '';
    this.description = init?.description ?? '';
    this.generateDate = init?.generateDate ?? new Date();
    this.debit = init?.debit ?? 0;
  }
}
export class UpdateFeesApproveRequest {
  studentdetailsfkid: number[];
  approved: boolean;

  constructor(init?: Partial<UpdateFeesApproveRequest>) {
    this.studentdetailsfkid = init?.studentdetailsfkid ?? [];
    this.approved = init?.approved ?? false;
  }
}
