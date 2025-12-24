import { IDocumentLibraryAdd } from '../../Document/documentlibrary';

export class ILanguageKnown {
  language: string;
  read: boolean;
  write: boolean;
  speake: boolean;

  constructor(init?: Partial<ILanguageKnown>) {
    this.language = init?.language ?? '';
    this.read = init?.read ?? false;
    this.write = init?.write ?? false;
    this.speake = init?.speake ?? false;
  }
}
export class ILanquageKnownRequest {
  language: string;
  readLanguage: string;
  writeLanguage: string;
  speakLanguage: string;

  constructor(init?: Partial<ILanquageKnownRequest>) {
    this.language = init?.language ?? '';
    this.readLanguage = init?.readLanguage ?? '';
    this.writeLanguage = init?.writeLanguage ?? '';
    this.speakLanguage = init?.speakLanguage ?? '';
  }
}

export class IEducationDetail {
  degreeType: string;
  degree: string;
  yearOfPassing: string;
  universityName: string;
  institutionName: string;
  mode: string;
  passPercentage: string;
  specialization: string;

  constructor(init?: Partial<IEducationDetail>) {
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

export class IExperienceDetail {
  institutionName: string;
  position: string;
  fromDate: string;
  toDate: string;
  yearsOfExperience: string;
  salary: string;

  constructor(init?: Partial<IExperienceDetail>) {
    this.institutionName = init?.institutionName ?? '';
    this.position = init?.position ?? '';
    this.fromDate = init?.fromDate ?? '';
    this.toDate = init?.toDate ?? '';
    this.yearsOfExperience = init?.yearsOfExperience ?? '';
    this.salary = init?.salary ?? '';
  }
}

export class IStaffDetails {
  title: string;
  name: string;
  initial: string;
  sex: string;
  dob: string;
  doj: string;
  placeOfBirth: string;
  religion: string;
  community: string;
  caste: string;
  physicalDisability: string;
  mobileNo: string;
  emailId: string;
  motherTongue: string;
  maritalStatus: string;
  aadharCardNo: string;
  bloodGroup: string;
  designation: string;
  designationCode: number;
  staffType: string;
  permanentAddress1: string;
  permanentAddress2: string;
  permanentAddressPincode: string;
  permanentAddressPostOffice: string;
  permanentAddressDistrict: string;
  permanentAddressState: string;
  communicationAddress1: string;
  communicationAddress2: string;
  communicationAddressPincode: string;
  communicationAddressPostOffice: string;
  communicationAddressDistrict: string;
  communicationAddressState: string;
  ifscCode: string;
  bankName: string;
  bankAddress: string;
  accountNumber: string;
  micrCode: string;
  panCardNo: string;
  imageFileName: string;
  imageContentType: string;
  imageData: string;
  guid: string;

  constructor(init?: Partial<IStaffDetails>) {
    this.title = init?.title ?? '';
    this.name = init?.name ?? '';
    this.initial = init?.initial ?? '';
    this.sex = init?.sex ?? '';
    this.dob = init?.dob ?? '';
    this.doj = init?.doj ?? '';
    this.placeOfBirth = init?.placeOfBirth ?? '';
    this.religion = init?.religion ?? '';
    this.community = init?.community ?? '';
    this.caste = init?.caste ?? '';
    this.physicalDisability = init?.physicalDisability ?? '';
    this.mobileNo = init?.mobileNo ?? '';
    this.emailId = init?.emailId ?? '';
    this.motherTongue = init?.motherTongue ?? '';
    this.maritalStatus = init?.maritalStatus ?? '';
    this.aadharCardNo = init?.aadharCardNo ?? '';
    this.bloodGroup = init?.bloodGroup ?? '';
    this.designation = init?.designation ?? '';
    this.designationCode = init?.designationCode ?? 0;
    this.staffType = init?.staffType ?? '';
    this.permanentAddress1 = init?.permanentAddress1 ?? '';
    this.permanentAddress2 = init?.permanentAddress2 ?? '';
    this.permanentAddressPincode = init?.permanentAddressPincode ?? '';
    this.permanentAddressPostOffice = init?.permanentAddressPostOffice ?? '';
    this.permanentAddressDistrict = init?.permanentAddressDistrict ?? '';
    this.permanentAddressState = init?.permanentAddressState ?? '';
    this.communicationAddress1 = init?.communicationAddress1 ?? '';
    this.communicationAddress2 = init?.communicationAddress2 ?? '';
    this.communicationAddressPincode = init?.communicationAddressPincode ?? '';
    this.communicationAddressPostOffice = init?.communicationAddressPostOffice ?? '';
    this.communicationAddressDistrict = init?.communicationAddressDistrict ?? '';
    this.communicationAddressState = init?.communicationAddressState ?? '';
    this.ifscCode = init?.ifscCode ?? '';
    this.bankName = init?.bankName ?? '';
    this.bankAddress = init?.bankAddress ?? '';
    this.accountNumber = init?.accountNumber ?? '';
    this.micrCode = init?.micrCode ?? '';
    this.panCardNo = init?.panCardNo ?? '';
    this.imageFileName = init?.imageFileName ?? '';
    this.imageContentType = init?.imageContentType ?? '';
    this.imageData = init?.imageData ?? '';
    this.guid = init?.guid ?? '';
  }
}
export class StaffDetailsUpdate extends IStaffDetails {
  sysid: number;
  staffID: string;
  status: string;
  dor: string; // ISO date string

  constructor(init?: Partial<StaffDetailsUpdate>) {
    super(init);
    this.sysid = init?.sysid ?? 0;
    this.staffID = init?.staffID ?? '';
    this.status = init?.status ?? '';
    this.dor = init?.dor ?? '';
  }
}
export class IStaffAutocompleteRequest {
  tableName: string;
  columnName: string;
  searchParam: string;

  constructor(init?: Partial<IStaffAutocompleteRequest>) {
    this.tableName = init?.tableName ?? '';
    this.columnName = init?.columnName ?? '';
    this.searchParam = init?.searchParam ?? '';
  }
}
export class IPostoffice {
  pincode: string;

  constructor(init?: Partial<IPostoffice>) {
    this.pincode = init?.pincode ?? '';
  }
}
export interface IStaffRequest {
  staffDetails: IStaffDetails;
  languageRequests: ILanquageKnownRequest[];
  educationRequests: IEducationDetail[];
  experienceRequests: IExperienceDetail[];
  documentRequests: IDocumentLibraryAdd[];
}
export class StaffDetailSearchResponse {
  sysId: number;
  name: string;
  designation: string;
  mobileNo: string;
  staffType: string;
  gender: string;
  enteredBy: string;
  entryDate?: Date;
  modifiedBy: string;
  modifiedDate?: Date;

  constructor(init?: Partial<StaffDetailSearchResponse>) {
    this.sysId = init?.sysId ?? 0;
    this.name = init?.name ?? '';
    this.designation = init?.designation ?? '';
    this.mobileNo = init?.mobileNo ?? '';
    this.staffType = init?.staffType ?? '';
    this.gender = init?.gender ?? '';
    this.enteredBy = init?.enteredBy ?? '';
    this.entryDate = init?.entryDate;
    this.modifiedBy = init?.modifiedBy ?? '';
    this.modifiedDate = init?.modifiedDate;
  }
}
export class StaffSearchRequest {
  columnName: string;
  searchParam: string;

  constructor(init?: Partial<StaffSearchRequest>) {
    this.columnName = init?.columnName ?? '';
    this.searchParam = init?.searchParam ?? '';
  }
}
export class StaffSearch {
  designation: string;
  name: string;

  constructor(init?: Partial<StaffSearch>) {
    this.designation = init?.designation ?? '';
    this.name = init?.name ?? '';
  }
}
export class StaffCountResponse {
  totalStaff: number;
  male: number;
  female: number;
  teaching: number;
  nonTeaching: number;

  constructor(init?: Partial<StaffCountResponse>) {
    this.totalStaff = init?.totalStaff ?? 0;
    this.male = init?.male ?? 0;
    this.female = init?.female ?? 0;
    this.teaching = init?.teaching ?? 0;
    this.nonTeaching = init?.nonTeaching ?? 0;
  }
}
export class StaffDetailsPKRequest {
  sysId: number;

  constructor(init?: Partial<StaffDetailsPKRequest>) {
    this.sysId = init?.sysId ?? 0;
  }
}
export class EducationAdd extends IEducationDetail {
  sysId: number;

  constructor(init?: Partial<EducationAdd>) {
    super(init);
    this.sysId = init?.sysId ?? 0;
  }
}
