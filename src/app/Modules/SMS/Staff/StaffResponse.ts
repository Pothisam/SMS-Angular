export class LanquageKnownResponse {
  sysId: number;
  language: string;
  read: boolean;
  write: boolean;
  speake: boolean;

  constructor(init?: Partial<LanquageKnownResponse>) {
    this.sysId = init?.sysId ?? 0;
    this.language = init?.language ?? '';
    this.read = init?.read ?? false;
    this.write = init?.write ?? false;
    this.speake = init?.speake ?? false;
  }
}
export class StaffLanguageResponse {
  sysId: number;
  language: string;
  readLanguage: string;
  writeLanguage: string;
  speakLanguage: string;

  constructor(init?: Partial<StaffLanguageResponse>) {
    this.sysId = init?.sysId ?? 0;
    this.language = init?.language ?? '';
    this.readLanguage = init?.readLanguage ?? '';
    this.writeLanguage = init?.writeLanguage ?? '';
    this.speakLanguage = init?.speakLanguage ?? '';
  }
}
export class StaffEducationResponse {
  sysId: number;
  degreeType: string;
  degree: string;
  yearOfPassing: string;
  universityName: string;
  institutionName: string;
  mode: string;
  passPercentage: string;
  specialization: string;

  constructor(init?: Partial<StaffEducationResponse>) {
    this.sysId = init?.sysId ?? 0;
    this.degreeType = init?.degreeType ?? '';
    this.degree = init?.degree ?? '';
    this.yearOfPassing = init?.yearOfPassing ?? '';
    this.universityName = init?.universityName ?? '';
    this.institutionName = init?.institutionName ?? '';
    this.mode = init?.mode ?? '';
    this.passPercentage = init?.passPercentage ?? '';
    this.specialization = init?.specialization ?? '';
  }
}
export class StaffExperienceResponse {
  sysId: number;
  institutionName: string;
  position: string;
  fromDate: Date;
  toDate: Date;
  yearsOfExperience: string;
  salary: number;

  constructor(init?: Partial<StaffExperienceResponse>) {
    this.sysId = init?.sysId ?? 0;
    this.institutionName = init?.institutionName ?? '';
    this.position = init?.position ?? '';
    this.fromDate = init?.fromDate ?? new Date();
    this.toDate = init?.toDate ?? new Date();
    this.yearsOfExperience = init?.yearsOfExperience ?? '';
    this.salary = init?.salary ?? 0;
  }
}
export class DocumentLibraryDetailsResponse {
  sysid: number;
  fileName: string;
  fileType: string;
  fileSize: number;
  guid: string;
  enteredBy: string;
  entryDate: Date;
  modifiedBy: string;
  modifiedDate: Date;

  constructor(init?: Partial<DocumentLibraryDetailsResponse>) {
    this.sysid = init?.sysid ?? 0;
    this.fileName = init?.fileName ?? '';
    this.fileType = init?.fileType ?? '';
    this.fileSize = init?.fileSize ?? 0;
    this.guid = init?.guid ?? '';
    this.enteredBy = init?.enteredBy ?? '';
    this.entryDate = init?.entryDate ?? new Date();
    this.modifiedBy = init?.modifiedBy ?? '';
    this.modifiedDate = init?.modifiedDate ?? new Date();
  }
}
