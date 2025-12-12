import { Component, SimpleChanges } from '@angular/core';
import { StudentDetailsReportRequest } from 'src/app/Modules/CMS/Student/Report/Report';

@Component({
  selector: 'app-ExportStudentDetails',
  templateUrl: './ExportStudentDetails.component.html',
  styleUrls: ['./ExportStudentDetails.component.css'],
  standalone: false,
})
export class ExportStudentDetailsComponent {
  triggerBatchAPI: boolean = false;
  triggerCourseAPI: boolean = false;
  triggerSectionAPI: boolean = false;
  isrequired: boolean = false;
  iscolumnrequired: boolean = true;
  request: StudentDetailsReportRequest = new StudentDetailsReportRequest();
  ColumnsList: string = '';

  constructor() {
    this.request.columns = '';
    this.ColumnsList =
      'RollNo|Roll No,UMIS|UMIS,APAAR|APAAR,ApplicationNumber|Application Number,AdmissionNumber|Admission Number,AdmissionSerialNumber|Admission Serial Number,AadharCardNo|Aadhar Card No,Name|Student Name with Initial,StudentName|Student Name,Initial|Student Initial,DOB|Date of Birth,PlaceOfBirth|Place Of Birth,Stdid|Student ID,MotherTongue|Mother Tongue,FatherName|Father Name,FatherOccupation|Father Occupation,FatherIncome|Father Income,BloodGroup|Blood Group,MotherName|Mother Name,MotherOccupation|Mother Occupation,MotherIncome|Mother Income,MobileNo as FatherMobileNo|Father Mobile No,MobileNo2 as MotherMobileNo|Mother Mobile No,StudentMobileNumber|Student Mobile Number,Emailid|Email ID,FirstLanguage|First Language,Religion|Religion,Community|Community,Caste|Caste,GuardianName|Guardian Name,ExtraCurricularActivities|Extra Curricular Activities,PhysicalDisability|Physical Disability,Volunteers|Volunteers,IFSCCode|IFSC Code,BankName|Bank Name,BankAddress|Bank Address,AccountNumber|Account Number,MICRCode|MICR Code,ParmanentAddress1|Parmanent Address 1,ParmanentAddress2|Parmanent Address 2,ParmanentAddressPostOffice|Parmanent Address Post Office,ParmanentAddressDistrict|Parmanent Address District,ParmanentAddressPincode|Parmanent Address Pincode,ParmanentAddressState|Parmanent Address State,CommunicationAddress1|Communication Address 1 State,CommunicationAddress2|Communication Address 2 State,CommunicationAddressPostOffice|Communication Address Post Office,CommunicationAddressDistrict|Communication Address District,CommunicationAddressPincode|Communication Address Pincode,CommunicationAddressState|Communication Address State,SchoolName|School Name,Subject1Name|Subject1 Name,Subject1Mark|Subject1 Mark,Subject2Name|Subject2 Name,Subject2Mark|Subject2 Mark,Subject3Name|Subject3 Name,Subject3Mark|Subject3 Mark,Subject4Name|Subject4 Name,Subject4Mark|Subject4 Mark,Subject5Name|Subject5 Name,Subject5Mark|Subject5 Mark,Subject6Name|Subject6 Name,Subject6Mark|Subject6 Mark,HSCMark|HSC Mark,HSCMarkPercentage|HSC Mark Percentage,MonthAndYearOfPassing|Month And Year Of Passing,HSCMarkPercentage|HSC Mark Percentage,StudiedGroup|Studied Group,MediumofStudy|Medium of Study,ExaminationPassed|Examination Passed,EMISNo|EMIS No,StudiedDegreeType|Studied Degree Type,StudiedDegree|Studied Degree,YearofPassing|Year of Passing,UniversityName|University Name,InstituionName|Instituion Name,StudiedMode|Studied Mode,PassPercentage|Pass Percentage,Specialization|Specialization,DateOfAdmission|Date Of Admission,DepartmentName|Department Name,DepartmentCode|Department Code,CourseType|Course Type,CourseYear|Course Year,CourseNameSD|Course Name SD,CourseNameBD|Course Name BD,CourseCode|Course Code,Section|Section,Batch|Batch,Semester|Semester,ExamRegisterNumber|Exam Register Number,BroSysStudyingStudied|Bro Sys Studying,NameBroSys|Name Bro Sys,ModeOFTransport|Mode OF Transport,BoardingPoint|Boarding Point,Hostel|Hostel,ScholarShip|ScholarShip,ScholarShipType|Government ScholarShip Type,CharityScholarship|Charity Scholarship,CharityAmount|Charity Amount,ManagementScholarship|Management Scholarship,Referredby|Referred by,Remark|Recommended by,Quota|Quota,DocumentEnclosed|DocumentEnclosed,DocumentNotEnclosed|Document Enclosed & Not Enclosed,Entrydate|Entry date,ModifiedDate|Modified Date';
  }

  onSelectedColumnsEvent(columns: string[]) {
    this.request.columns = columns.join(',');
  }
  onBatchChange() {
    this.request.courseCode = '';
    this.request.section = '';
    this.isrequired = false;
  }
  onCourseChange() {
    if (this.request?.courseCode) {
      this.isrequired = true;
    } else {
      this.isrequired = false;
      this.request.section = '';
      this.request.courseCode = '';
    }
  }
  onHover(state: boolean): void {
    if (this.isrequired == true && this.request?.courseCode) {
      this.iscolumnrequired = !state;
    } else {
      this.isrequired = state;
      this.iscolumnrequired = !state;
    }
  }
  onexportImage(state: boolean): void {
    this.iscolumnrequired = !state;
  }
}
