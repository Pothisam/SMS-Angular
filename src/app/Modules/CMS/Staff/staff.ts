import { IDocumentLibraryAdd } from '../../Document/documentlibrary';

export interface ILanquageKnown {
  Language: string;
  read: boolean;
  write: boolean;
  speake: boolean;
}
export interface ILanquageKnownRequest {
  LanguageKnow: string;
  ReadLanguage: string;
  WriteLanguage: string;
  SpeakLanguage: string;
}
export interface IStaffDetailsUpdate extends IStaffDetails {
  sysid: number;
  staffID: string;
  status: string;
  dor: string; // ISO date string
}
export interface IStaffDetails {
  title: string;
  name: string;
  initial: string;
  sex: string;
  dob: string; // ISO date string
  age: string;
  doj: string; // ISO date string
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
  departmentName: string;
  departmentCode: string;
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
}
export interface IStaffAutocompleteRequest {
  tableName: string;
  columnName: string;
  searchParam: string;
}
export interface IEducationDetail {
  degreeType: string;
  degree: string;
  yearOfPassing: string;
  universityName: string;
  instituionName: string;
  mode: string;
  passPercentage: string;
  specialization: string;
}
export interface IEducationAdd extends IEducationDetail {
  sysId: number;
}
export interface IExperienceAdd extends IExperienceDetail {
  sysId: number;
}
export interface IExperienceDetail {
  InstituionName: string;
  position: string;
  fromDate: string;
  toDate: string;
  yearsOfExperience: string;
  salary: string;
}
export interface IStaffRequest {
  staffDetails: IStaffDetails;
  languageRequests: ILanquageKnownRequest[];
  educationRequests: IEducationDetail[];
  experienceRequests: IExperienceDetail[];
  documentRequests: IDocumentLibraryAdd[];
}
export interface IStaffSearchRequest {
  columnName: string;
  searchParam: string;
}
export interface IStaffSearch {
  departmentCode: string;
  designation: string;
  name: string;
}
export interface IStaffCountResponse {
  totalStaff: number;
  male: number;
  female: number;
  teaching: number;
  nonTeaching: number;
}
export interface IStaffDetailSearchResponse {
  sysId: number;
  name: string;
  departmentName: string;
  designation: string;
  mobileNo: string;
  staffType: string;
  gender: string;
  enteredBy: string;
  entryDate?: Date; // Nullable DateTime in C# translates to optional Date in TS
  modifiedBy: string;
  modifiedDate?: Date; // Nullable DateTime in C# translates to optional Date in TS
}
export interface StaffDetailsPKRequest {
  sysId: number;
}
export interface IStaffDetailsResponse {
  staffDetail: IStaffDetailResponse;
  staffLanguage: IStaffLanguageResponse[];
  staffEducation: IStaffEducationResponse[];
  staffExprience: IStaffExperienceResponse[];
  staffDocument: IDocumentLibraryDetailsResponse[];
}

export interface IStaffDetailResponse {
  staffID: string;
  staffType: string;
  enteredBy: string;
  entryDate?: Date;
  modifiedBy: string;
  modifiedDate?: Date;
  title: string;
  name: string;
  initial: string;
  gender: string;
  bloodGroup: string;
  dob?: Date;
  placeOfBirth: string;
  maritalStatus: string;
  religion: string;
  physicalDisability: string;
  community: string;
  caste: string;
  mobileNo: string;
  emailID: string;
  aadharCardNo: string;
  departmentName: string;
  designation: number;
  doj?: Date;
  parmanentAddress1: string;
  parmanentAddress2: string;
  parmanentAddressPincode: string;
  parmanentAddressPostOffice: string;
  parmanentAddressDistrict: string;
  parmanentAddressState: string;
  communicationAddress1: string;
  communicationAddress2: string;
  communicationAddressPincode: string;
  communicationAddressPostOffice: string;
  communicationAddressDistrict: string;
  communicationAddressState: string;
  status: string;
  motherTongue: string;
  ifscCode: string;
  bankName: string;
  bankAddress: string;
  accountNumber: string;
  micrCode: string;
  panCardNo: string;
}
export interface ILanquageKnownResponse {
  sysId: number;
  Language: string;
  read: boolean;
  write: boolean;
  speake: boolean;
}
export interface IStaffLanguageResponse {
  sysId: number;
  languageKnow: string;
  readLanguage: string;
  writeLanguage: string;
  speakLanguage: string;
}

export interface IStaffEducationResponse {
  sysId: number;
  degreeType: string;
  degree: string;
  yearOfPassing: number;
  universityName: string;
  institutionName: string;
  mode: string;
  passPercentage: string;
  specialization: string;
}

export interface IStaffExperienceResponse {
  sysId: number;
  institutionName: string;
  position: string;
  fromDate: Date;
  toDate: Date;
  yearsOfExperience: string;
  salary: number;
}

export interface IDocumentLibraryDetailsResponse {
  sysid: number;
  fileName: string;
  fileType: string;
  fileSize: number;
  guid: string;
  enteredBy: string;
  entryDate: Date;
  modifiedBy: string;
  modifiedDate: Date;
}
