import { IDocumentLibraryAdd } from '../../Document/documentlibrary';

export class ImageFile {
  imageFileName: string;
  imageContentType: string;
  imageData: string;

  constructor(data?: Partial<ImageFile>) {
    this.imageFileName = data?.imageFileName ?? '';
    this.imageContentType = data?.imageContentType ?? '';
    this.imageData = data?.imageData ?? '';
  }
}
export interface IStudentRequest {
  studentdetails: StudentDetailInsertRequest;
  documentrequests: IDocumentLibraryAdd[];
}
export class StudentDetailInsertRequest extends ImageFile {
  applicationNumber?: string;
  admissionNumber?: string;
  admissionSerialNumber?: string;
  name!: string;
  initial!: string;
  dob!: string;
  placeOfBirth?: string;
  motherTongue?: string;
  fatherName?: string;
  fatherOccupation?: string;
  fatherIncome!: number;
  bloodGroup!: string;
  motherName?: string;
  motherOccupation?: string;
  motherIncome!: number;
  aadharCardNo!: string;
  mobileNo!: string;
  mobileNo2?: string;
  studentMobileNumber: string;
  emailid?: string;
  firstLanguage?: string;
  parents?: string;
  religion?: string;
  community?: string;
  caste?: string;
  guardianName?: string;
  extraCurricularActivities?: string;
  physicalDisability?: string;
  volunteers?: string;
  courseType!: string;
  gender!: string;
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
  schoolName?: string;
  subject1Name?: string;
  subject1Mark!: number;
  subject2Name?: string;
  subject2Mark!: number;
  subject3Name?: string;
  subject3Mark!: number;
  subject4Name?: string;
  subject4Mark!: number;
  subject5Name?: string;
  subject5Mark!: number;
  subject6Name?: string;
  subject6Mark!: number;
  hscmark?: number;
  hscmarkPercentage?: number;
  monthAndYearOfPassing?: string;
  studiedGroup?: string;
  hscrollNo?: string;
  mediumOfStudy?: string;
  totalMaxMark: number;
  emisno?: string;
  examinationPassed?: string;
  studiedDegreeType?: string;
  studiedDegree?: string;
  yearOfPassing?: string;
  universityName?: string;
  instituionName?: string;
  studiedMode?: string;
  passPercentage?: number;
  specialization?: string;
  dateOfAdmission: string;
  rollNo?: string;
  departmentName: string;
  departmentCode: string;
  courseYear?: string;
  courseNameSd!: string;
  courseNameBd!: string;
  courseCode!: string;
  section: string;
  batch: string;
  semester: string;
  examRegisterNumber?: string;
  umis?: string;
  apaar?: string;
  broSysStudyingStudied?: string;
  nameBroSys?: string;
  modeOfTransport?: string;
  boardingPoint?: string;
  hostel?: string;
  scholarShip?: string;
  scholarShipType?: string;
  charityScholarship?: string;
  charityAmount: number;
  managementScholarship: string;
  quota?: string;
  concession?: number;
  remark?: string;
  referredBy?: string;
  tcReceivedDate?: string;
  documentEnclosed?: string;
  documentNotEnclosed?: string;
  status!: string;
  lastDate?: string;
  reasonForLeaving?: string;
  ifscCode: string;
  bankName?: string;
  bankAddress?: string;
  accountNumber?: string;
  micrCode?: string;

  constructor(data?: Partial<StudentDetailInsertRequest>) {
    super(data);
    this.applicationNumber = data?.applicationNumber ?? '';
    this.admissionNumber = data?.admissionNumber ?? '';
    this.admissionSerialNumber = data?.admissionSerialNumber ?? '';
    this.name = data?.name ?? '';
    this.initial = data?.initial ?? '';
    this.dob = data?.dob ?? ''; // Default to current date
    this.placeOfBirth = data?.placeOfBirth ?? '';
    this.motherTongue = data?.motherTongue ?? '';
    this.fatherName = data?.fatherName ?? '';
    this.fatherOccupation = data?.fatherOccupation ?? '';
    this.fatherIncome = data?.fatherIncome ?? 0;
    this.bloodGroup = data?.bloodGroup ?? '';
    this.motherName = data?.motherName ?? '';
    this.motherOccupation = data?.motherOccupation ?? '';
    this.motherIncome = data?.motherIncome ?? 0;
    this.aadharCardNo = data?.aadharCardNo ?? '';
    this.mobileNo = data?.mobileNo ?? '';
    this.mobileNo2 = data?.mobileNo2 ?? '';
    this.studentMobileNumber = data?.studentMobileNumber ?? '';
    this.emailid = data?.emailid ?? '';
    this.firstLanguage = data?.firstLanguage ?? '';
    this.parents = data?.parents ?? '';
    this.religion = data?.religion ?? '';
    this.community = data?.community ?? '';
    this.caste = data?.caste ?? '';
    this.guardianName = data?.guardianName ?? '';
    this.extraCurricularActivities = data?.extraCurricularActivities ?? '';
    this.physicalDisability = data?.physicalDisability ?? '';
    this.volunteers = data?.volunteers ?? '';
    this.courseType = data?.courseType ?? '';
    this.gender = data?.gender ?? '';
    this.parmanentAddress1 = data?.parmanentAddress1 ?? '';
    this.parmanentAddress2 = data?.parmanentAddress2 ?? '';
    this.parmanentAddressPincode = data?.parmanentAddressPincode ?? '';
    this.parmanentAddressPostOffice = data?.parmanentAddressPostOffice ?? '';
    this.parmanentAddressDistrict = data?.parmanentAddressDistrict ?? '';
    this.parmanentAddressState = data?.parmanentAddressState ?? '';
    this.communicationAddress1 = data?.communicationAddress1 ?? '';
    this.communicationAddress2 = data?.communicationAddress2 ?? '';
    this.communicationAddressPincode = data?.communicationAddressPincode ?? '';
    this.communicationAddressPostOffice = data?.communicationAddressPostOffice ?? '';
    this.communicationAddressDistrict = data?.communicationAddressDistrict ?? '';
    this.communicationAddressState = data?.communicationAddressState ?? '';
    this.schoolName = data?.schoolName ?? '';
    this.subject1Name = data?.subject1Name ?? '';
    this.subject1Mark = data?.subject1Mark ?? 0;
    this.subject2Name = data?.subject2Name ?? '';
    this.subject2Mark = data?.subject2Mark ?? 0;
    this.subject3Name = data?.subject3Name ?? '';
    this.subject3Mark = data?.subject3Mark ?? 0;
    this.subject4Name = data?.subject4Name ?? '';
    this.subject4Mark = data?.subject4Mark ?? 0;
    this.subject5Name = data?.subject5Name ?? '';
    this.subject5Mark = data?.subject5Mark ?? 0;
    this.subject6Name = data?.subject6Name ?? '';
    this.subject6Mark = data?.subject6Mark ?? 0;
    this.hscmark = data?.hscmark ?? 0;
    this.hscmarkPercentage = data?.hscmarkPercentage ?? 0;
    this.monthAndYearOfPassing = data?.monthAndYearOfPassing ?? '';
    this.studiedGroup = data?.studiedGroup ?? '';
    this.hscrollNo = data?.hscrollNo ?? '';
    this.mediumOfStudy = data?.mediumOfStudy ?? '';
    this.totalMaxMark = data?.totalMaxMark ?? 600;
    this.emisno = data?.emisno ?? '';
    this.examinationPassed = data?.examinationPassed ?? '';
    this.umis = data?.umis ?? '';
    this.apaar = data?.apaar ?? '';
    this.studiedDegreeType = data?.studiedDegreeType ?? '';
    this.studiedDegree = data?.studiedDegree ?? '';
    this.yearOfPassing = data?.yearOfPassing ?? '';
    this.universityName = data?.universityName ?? '';
    this.instituionName = data?.instituionName ?? '';
    this.studiedMode = data?.studiedMode ?? '';
    this.passPercentage = data?.passPercentage ?? 0;
    this.specialization = data?.specialization ?? '';
    this.dateOfAdmission = data?.dateOfAdmission ?? ''; // Default to current date
    this.rollNo = data?.rollNo ?? '';
    this.departmentName = data?.departmentName ?? '';
    this.departmentCode = data?.departmentCode ?? '';
    this.courseYear = data?.courseYear ?? '';
    this.courseNameSd = data?.courseNameSd ?? '';
    this.courseNameBd = data?.courseNameBd ?? '';
    this.courseCode = data?.courseCode ?? '';
    this.section = data?.section ?? '';
    this.batch = data?.batch ?? '';
    this.semester = data?.semester ?? '';
    this.examRegisterNumber = data?.examRegisterNumber ?? '';
    this.broSysStudyingStudied = data?.broSysStudyingStudied ?? '';
    this.nameBroSys = data?.nameBroSys ?? '';
    this.modeOfTransport = data?.modeOfTransport ?? '';
    this.boardingPoint = data?.boardingPoint ?? '';
    this.hostel = data?.hostel ?? '';
    this.scholarShip = data?.scholarShip ?? '';
    this.scholarShipType = data?.scholarShipType ?? '';
    this.charityScholarship = data?.charityScholarship ?? '';
    this.charityAmount = data?.charityAmount ?? 0;
    this.managementScholarship = data?.managementScholarship ?? '';
    this.quota = data?.quota ?? '';
    this.concession = data?.concession ?? 0;
    this.remark = data?.remark ?? '';
    this.referredBy = data?.referredBy ?? '';
    this.tcReceivedDate = data?.tcReceivedDate ?? ''; // Default to current date
    this.documentEnclosed = data?.documentEnclosed ?? '';
    this.documentNotEnclosed = data?.documentNotEnclosed ?? '';
    this.status = data?.status ?? '';
    this.lastDate = data?.lastDate ?? ''; // Default to current date
    this.reasonForLeaving = data?.reasonForLeaving ?? '';
    this.ifscCode = data?.ifscCode ?? '';
    this.bankName = data?.bankName ?? '';
    this.bankAddress = data?.bankAddress ?? '';
    this.accountNumber = data?.accountNumber ?? '';
    this.micrCode = data?.micrCode ?? '';
  }
}
export class StudentCountResponse {
  totalStudent: number;
  male: number;
  female: number;
  transgender: number;
  ug: number;
  pg: number;

  constructor(
    totalStudent: number = 0,
    male: number = 0,
    female: number = 0,
    transgender: number = 0,
    ug: number = 0,
    pg: number = 0,
  ) {
    this.totalStudent = totalStudent;
    this.male = male;
    this.female = female;
    this.transgender = transgender;
    this.ug = ug;
    this.pg = pg;
  }
}
export class StudentDetailsShortResponse {
  sysId!: number;
  name: string;
  departmentName: string;
  courseWithYearAndSection: string;
  batch: string;
  rollNo: string;
  dob?: Date;
  enteredBy: string;
  entryDate?: Date;
  modifiedBy: string;
  modifiedDate?: Date;
  guid?: string;

  constructor(
    sysId: number = 0,
    name: string = '',
    departmentName: string = '',
    courseWithYearAndSection: string = '',
    batch: string = '',
    rollNo: string = '',
    dob?: Date,
    enteredBy: string = '',
    entryDate?: Date,
    modifiedBy: string = '',
    modifiedDate?: Date,
    guid?: string,
  ) {
    this.sysId = sysId;
    this.name = name;
    this.departmentName = departmentName;
    this.courseWithYearAndSection = courseWithYearAndSection;
    this.batch = batch;
    this.rollNo = rollNo;
    this.dob = dob;
    this.enteredBy = enteredBy;
    this.entryDate = entryDate;
    this.modifiedBy = modifiedBy;
    this.modifiedDate = modifiedDate;
    this.guid = guid;
  }
}
export class StudentShortRequest {
  departmentCode: string;
  courseCode: string;
  batch: string;

  constructor(departmentCode: string = '', courseCode: string = '', batch: string = '') {
    this.departmentCode = departmentCode;
    this.courseCode = courseCode;
    this.batch = batch;
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
export class StudentDetailPKRequest {
  sysId: number = 0;

  constructor(sysId: number = 0) {
    this.sysId = sysId;
  }
}
export class StudentDetailUpdateRequest {
  sysId: number;
  applicationNumber?: string;
  admissionNumber?: string;
  admissionSerialNumber?: string;
  name!: string;
  initial!: string;
  dob!: string;
  placeOfBirth?: string;
  motherTongue?: string;
  fatherName?: string;
  fatherOccupation?: string;
  fatherIncome!: number;
  bloodGroup!: string;
  motherName?: string;
  motherOccupation?: string;
  motherIncome!: number;
  aadharCardNo!: string;
  mobileNo!: string;
  mobileNo2?: string;
  studentMobileNumber: string;
  emailid?: string;
  firstLanguage?: string;
  parents?: string;
  religion?: string;
  community?: string;
  caste?: string;
  guardianName?: string;
  extraCurricularActivities?: string;
  physicalDisability?: string;
  volunteers?: string;
  courseType!: string;
  gender!: string;
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
  schoolName?: string;
  subject1Name?: string;
  subject1Mark!: number;
  subject2Name?: string;
  subject2Mark!: number;
  subject3Name?: string;
  subject3Mark!: number;
  subject4Name?: string;
  subject4Mark!: number;
  subject5Name?: string;
  subject5Mark!: number;
  subject6Name?: string;
  subject6Mark!: number;
  hscmark?: number;
  hscmarkPercentage?: number;
  monthAndYearOfPassing?: string;
  studiedGroup?: string;
  hscrollNo?: string;
  mediumOfStudy?: string;
  totalMaxMark: number;
  emisno?: string;
  examinationPassed?: string;
  studiedDegreeType?: string;
  studiedDegree?: string;
  yearOfPassing?: string;
  universityName?: string;
  instituionName?: string;
  studiedMode?: string;
  passPercentage?: number;
  specialization?: string;
  dateOfAdmission: string;
  rollNo?: string;
  departmentName: string;
  departmentCode: string;
  courseYear?: string;
  courseNameSd!: string;
  courseNameBd!: string;
  courseCode!: string;
  section: string;
  batch: string;
  semester: string;
  examRegisterNumber?: string;
  umis?: string;
  apaar?: string;
  broSysStudyingStudied?: string;
  nameBroSys?: string;
  modeOfTransport?: string;
  boardingPoint?: string;
  hostel?: string;
  scholarShip?: string;
  scholarShipType?: string;
  charityScholarship?: string;
  charityAmount: number;
  managementScholarship: string;
  quota?: string;
  concession?: number;
  remark?: string;
  referredBy?: string;
  tcReceivedDate?: string;
  documentEnclosed?: string;
  documentNotEnclosed?: string;
  status!: string;
  lastDate?: string;
  reasonForLeaving?: string;
  ifscCode: string;
  bankName?: string;
  bankAddress?: string;
  accountNumber?: string;
  micrCode?: string;
  guid?: string;
  constructor(data?: Partial<StudentDetailUpdateRequest>) {
    this.sysId = data?.sysId ?? 0;
    this.applicationNumber = data?.applicationNumber ?? '';
    this.admissionNumber = data?.admissionNumber ?? '';
    this.admissionSerialNumber = data?.admissionSerialNumber ?? '';
    this.name = data?.name ?? '';
    this.initial = data?.initial ?? '';
    this.dob = data?.dob ?? ''; // Default to current date
    this.placeOfBirth = data?.placeOfBirth ?? '';
    this.motherTongue = data?.motherTongue ?? '';
    this.fatherName = data?.fatherName ?? '';
    this.fatherOccupation = data?.fatherOccupation ?? '';
    this.fatherIncome = data?.fatherIncome ?? 0;
    this.bloodGroup = data?.bloodGroup ?? '';
    this.motherName = data?.motherName ?? '';
    this.motherOccupation = data?.motherOccupation ?? '';
    this.motherIncome = data?.motherIncome ?? 0;
    this.aadharCardNo = data?.aadharCardNo ?? '';
    this.mobileNo = data?.mobileNo ?? '';
    this.mobileNo2 = data?.mobileNo2 ?? '';
    this.studentMobileNumber = data?.studentMobileNumber ?? '';
    this.emailid = data?.emailid ?? '';
    this.firstLanguage = data?.firstLanguage ?? '';
    this.parents = data?.parents ?? '';
    this.religion = data?.religion ?? '';
    this.community = data?.community ?? '';
    this.caste = data?.caste ?? '';
    this.guardianName = data?.guardianName ?? '';
    this.extraCurricularActivities = data?.extraCurricularActivities ?? '';
    this.physicalDisability = data?.physicalDisability ?? '';
    this.volunteers = data?.volunteers ?? '';
    this.courseType = data?.courseType ?? '';
    this.gender = data?.gender ?? '';
    this.parmanentAddress1 = data?.parmanentAddress1 ?? '';
    this.parmanentAddress2 = data?.parmanentAddress2 ?? '';
    this.parmanentAddressPincode = data?.parmanentAddressPincode ?? '';
    this.parmanentAddressPostOffice = data?.parmanentAddressPostOffice ?? '';
    this.parmanentAddressDistrict = data?.parmanentAddressDistrict ?? '';
    this.parmanentAddressState = data?.parmanentAddressState ?? '';
    this.communicationAddress1 = data?.communicationAddress1 ?? '';
    this.communicationAddress2 = data?.communicationAddress2 ?? '';
    this.communicationAddressPincode = data?.communicationAddressPincode ?? '';
    this.communicationAddressPostOffice = data?.communicationAddressPostOffice ?? '';
    this.communicationAddressDistrict = data?.communicationAddressDistrict ?? '';
    this.communicationAddressState = data?.communicationAddressState ?? '';
    this.schoolName = data?.schoolName ?? '';
    this.subject1Name = data?.subject1Name ?? '';
    this.subject1Mark = data?.subject1Mark ?? 0;
    this.subject2Name = data?.subject2Name ?? '';
    this.subject2Mark = data?.subject2Mark ?? 0;
    this.subject3Name = data?.subject3Name ?? '';
    this.subject3Mark = data?.subject3Mark ?? 0;
    this.subject4Name = data?.subject4Name ?? '';
    this.subject4Mark = data?.subject4Mark ?? 0;
    this.subject5Name = data?.subject5Name ?? '';
    this.subject5Mark = data?.subject5Mark ?? 0;
    this.subject6Name = data?.subject6Name ?? '';
    this.subject6Mark = data?.subject6Mark ?? 0;
    this.hscmark = data?.hscmark ?? 0;
    this.hscmarkPercentage = data?.hscmarkPercentage ?? 0;
    this.monthAndYearOfPassing = data?.monthAndYearOfPassing ?? '';
    this.studiedGroup = data?.studiedGroup ?? '';
    this.hscrollNo = data?.hscrollNo ?? '';
    this.mediumOfStudy = data?.mediumOfStudy ?? '';
    this.totalMaxMark = data?.totalMaxMark ?? 600;
    this.emisno = data?.emisno ?? '';
    this.examinationPassed = data?.examinationPassed ?? '';
    this.studiedDegreeType = data?.studiedDegreeType ?? '';
    this.studiedDegree = data?.studiedDegree ?? '';
    this.yearOfPassing = data?.yearOfPassing ?? '';
    this.universityName = data?.universityName ?? '';
    this.instituionName = data?.instituionName ?? '';
    this.studiedMode = data?.studiedMode ?? '';
    this.passPercentage = data?.passPercentage ?? 0;
    this.specialization = data?.specialization ?? '';
    this.dateOfAdmission = data?.dateOfAdmission ?? ''; // Default to current date
    this.rollNo = data?.rollNo ?? '';
    this.departmentName = data?.departmentName ?? '';
    this.departmentCode = data?.departmentCode ?? '';
    this.courseYear = data?.courseYear ?? '';
    this.courseNameSd = data?.courseNameSd ?? '';
    this.courseNameBd = data?.courseNameBd ?? '';
    this.courseCode = data?.courseCode ?? '';
    this.section = data?.section ?? '';
    this.batch = data?.batch ?? '';
    this.semester = data?.semester ?? '';
    this.examRegisterNumber = data?.examRegisterNumber ?? '';
    this.umis = data?.umis ?? '';
    this.apaar = data?.apaar ?? '';
    this.broSysStudyingStudied = data?.broSysStudyingStudied ?? '';
    this.nameBroSys = data?.nameBroSys ?? '';
    this.modeOfTransport = data?.modeOfTransport ?? '';
    this.boardingPoint = data?.boardingPoint ?? '';
    this.hostel = data?.hostel ?? '';
    this.scholarShip = data?.scholarShip ?? '';
    this.scholarShipType = data?.scholarShipType ?? '';
    this.charityScholarship = data?.charityScholarship ?? '';
    this.charityAmount = data?.charityAmount ?? 0;
    this.managementScholarship = data?.managementScholarship ?? '';
    this.quota = data?.quota ?? '';
    this.concession = data?.concession ?? 0;
    this.remark = data?.remark ?? '';
    this.referredBy = data?.referredBy ?? '';
    this.tcReceivedDate = data?.tcReceivedDate ?? ''; // Default to current date
    this.documentEnclosed = data?.documentEnclosed ?? '';
    this.documentNotEnclosed = data?.documentNotEnclosed ?? '';
    this.status = data?.status ?? '';
    this.lastDate = data?.lastDate ?? ''; // Default to current date
    this.reasonForLeaving = data?.reasonForLeaving ?? '';
    this.ifscCode = data?.ifscCode ?? '';
    this.bankName = data?.bankName ?? '';
    this.bankAddress = data?.bankAddress ?? '';
    this.accountNumber = data?.accountNumber ?? '';
    this.micrCode = data?.micrCode ?? '';
    this.guid = data?.guid ?? '';
  }
}

export class StudentAddApplicationFormRequestModel {
  applicationNo: string;
  studentName: string;
  mobileNo: string;
  alternateMobileNo?: string;
  courseType: string;
  departmentName: string;
  course: string;
  courseName: string = '';
  departmentCode: string = '';

  constructor(data?: Partial<StudentAddApplicationFormRequestModel>) {
    this.applicationNo = data?.applicationNo ?? '';
    this.studentName = data?.studentName ?? '';
    this.mobileNo = data?.mobileNo ?? '';
    this.alternateMobileNo = data?.alternateMobileNo ?? '';
    this.courseType = data?.courseType ?? '';
    this.departmentName = data?.departmentName ?? '';
    this.course = data?.course ?? '';
  }
}

export class StudentApplicationListResponse {
  sysid: number;
  applicationNo: string;
  studentName: string;
  mobileNo: string;
  alternateMobileNo?: string;
  courseType: string;
  departmentName: string;
  course: string;
  status: string;
  remark?: string;
  enteredBy: string;
  entryDate: Date;
  modifiedBy: string;
  modifiedDate: Date;

  constructor(data?: Partial<StudentApplicationListResponse>) {
    this.sysid = data?.sysid ?? 0;
    this.applicationNo = data?.applicationNo ?? '';
    this.studentName = data?.studentName ?? '';
    this.mobileNo = data?.mobileNo ?? '';
    this.alternateMobileNo = data?.alternateMobileNo ?? '';
    this.courseType = data?.courseType ?? '';
    this.departmentName = data?.departmentName ?? '';
    this.course = data?.course ?? '';
    this.status = data?.status ?? '';
    this.remark = data?.remark ?? '';
    this.enteredBy = data?.enteredBy ?? '';
    this.entryDate = data?.entryDate ? new Date(data.entryDate) : new Date();
    this.modifiedBy = data?.modifiedBy ?? '';
    this.modifiedDate = data?.modifiedDate ? new Date(data.modifiedDate) : new Date();
  }
}

export class StudentApplicationEditResponseModel {
  applicationNo: string;
  studentName: string;
  mobileNo: string;
  alternateMobileNo?: string;
  status: string;

  constructor(data?: Partial<StudentApplicationEditResponseModel>) {
    this.applicationNo = data?.applicationNo ?? '';
    this.studentName = data?.studentName ?? '';
    this.mobileNo = data?.mobileNo ?? '';
    this.alternateMobileNo = data?.alternateMobileNo ?? '';
    this.status = data?.status ?? '';
  }
}
