import { IDocumentLibraryAdd } from '../../Document/documentlibrary';

export interface IStudentRequest {
  studentdetails: StudentDetailInsertRequest;
  documentrequests: IDocumentLibraryAdd[];
}
export class StudentDetailInsertRequest {
  applicationNumber: string;
  admissionNumber: string;
  admissionSerialNumber: string;
  studentType: string;
  name: string;
  initial: string;
  dob: Date;
  placeOfBirth: string;
  motherTongue: string;
  fatherName: string;
  fatherOccupation: string;
  fatherIncome: number;
  bloodGroup: string;
  motherName: string;
  motherOccupation: string;
  motherIncome: number;
  aadharCardNo: string;
  mobileNo: string;
  mobileNo2: string;
  emailid: string;
  firstLanguage: string;
  parents: string;
  religion: string;
  community: string;
  caste: string;
  guardianName: string;
  extraCurricularActivities: string;
  physicalDisability: string;
  volunteers: string;
  gender: string;

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

  dateOfAdmission: Date;
  broSysStudyingStudied: string;
  nameBroSys: string;
  modeOftransport: string;
  boardingPoint: string;
  hostel: string;
  remark: string;
  referredby: string;
  tcreceivedDate: Date;
  documentEnclosed: string;
  documentNotEnclosed: string;
  lastDate: Date;
  reasonforleaving: string;
  classfkid: number;
  classSection: number;
  acadamicYear: number;

  imageFileName: string;
  imageContentType: string;
  imageData: string;

  constructor(init?: Partial<StudentDetailInsertRequest>) {
    this.applicationNumber = init?.applicationNumber ?? '';
    this.admissionNumber = init?.admissionNumber ?? '';
    this.admissionSerialNumber = init?.admissionSerialNumber ?? '';
    this.studentType = init?.studentType ?? '';
    this.name = init?.name ?? '';
    this.initial = init?.initial ?? '';
    this.dob = init?.dob ?? new Date();
    this.placeOfBirth = init?.placeOfBirth ?? '';
    this.motherTongue = init?.motherTongue ?? '';
    this.fatherName = init?.fatherName ?? '';
    this.fatherOccupation = init?.fatherOccupation ?? '';
    this.fatherIncome = init?.fatherIncome ?? 0;
    this.bloodGroup = init?.bloodGroup ?? '';
    this.motherName = init?.motherName ?? '';
    this.motherOccupation = init?.motherOccupation ?? '';
    this.motherIncome = init?.motherIncome ?? 0;
    this.aadharCardNo = init?.aadharCardNo ?? '';
    this.mobileNo = init?.mobileNo ?? '';
    this.mobileNo2 = init?.mobileNo2 ?? '';
    this.emailid = init?.emailid ?? '';
    this.firstLanguage = init?.firstLanguage ?? '';
    this.parents = init?.parents ?? '';
    this.religion = init?.religion ?? '';
    this.community = init?.community ?? '';
    this.caste = init?.caste ?? '';
    this.guardianName = init?.guardianName ?? '';
    this.extraCurricularActivities = init?.extraCurricularActivities ?? '';
    this.physicalDisability = init?.physicalDisability ?? '';
    this.volunteers = init?.volunteers ?? '';
    this.gender = init?.gender ?? '';

    this.parmanentAddress1 = init?.parmanentAddress1 ?? '';
    this.parmanentAddress2 = init?.parmanentAddress2 ?? '';
    this.parmanentAddressPincode = init?.parmanentAddressPincode ?? '';
    this.parmanentAddressPostOffice = init?.parmanentAddressPostOffice ?? '';
    this.parmanentAddressDistrict = init?.parmanentAddressDistrict ?? '';
    this.parmanentAddressState = init?.parmanentAddressState ?? '';

    this.communicationAddress1 = init?.communicationAddress1 ?? '';
    this.communicationAddress2 = init?.communicationAddress2 ?? '';
    this.communicationAddressPincode = init?.communicationAddressPincode ?? '';
    this.communicationAddressPostOffice = init?.communicationAddressPostOffice ?? '';
    this.communicationAddressDistrict = init?.communicationAddressDistrict ?? '';
    this.communicationAddressState = init?.communicationAddressState ?? '';

    this.dateOfAdmission = init?.dateOfAdmission ?? new Date();
    this.broSysStudyingStudied = init?.broSysStudyingStudied ?? '';
    this.nameBroSys = init?.nameBroSys ?? '';
    this.modeOftransport = init?.modeOftransport ?? '';
    this.boardingPoint = init?.boardingPoint ?? '';
    this.hostel = init?.hostel ?? '';
    this.remark = init?.remark ?? '';
    this.referredby = init?.referredby ?? '';
    this.tcreceivedDate = init?.tcreceivedDate ?? new Date();
    this.documentEnclosed = init?.documentEnclosed ?? '';
    this.documentNotEnclosed = init?.documentNotEnclosed ?? '';
    this.lastDate = init?.lastDate ?? new Date();
    this.reasonforleaving = init?.reasonforleaving ?? '';
    this.classfkid = init?.classfkid ?? 0;
    this.classSection = init?.classSection ?? 0;
    this.acadamicYear = init?.acadamicYear ?? 0;

    this.imageFileName = init?.imageFileName ?? '';
    this.imageContentType = init?.imageContentType ?? '';
    this.imageData = init?.imageData ?? '';
  }
}
export class StudentShortRequest {
  courseSysid: string;

  constructor(courseSysid: string = '') {
    this.courseSysid = courseSysid;
  }
}
export class StudentSearchRequest {
  columnName: string;
  searchParam: string;

  constructor(data?: Partial<StudentSearchRequest>) {
    this.columnName = data?.columnName || '';
    this.searchParam = data?.searchParam || '';
  }
}
