import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import {
  CommonAutocompleteRequest,
  CommonCourseCodeRequest,
  CommonCourseTypeAndDepartmentCodeRequestBase,
  CommonCourseTypeRequestBase,
  CommonSemesterYearRequest,
} from 'src/app/Global/Interface/common-interface';
import { IStudentRequest, StudentDetailInsertRequest } from 'src/app/Modules/CMS/Student/Student';
import { StaffService } from '../../Staff/staff.service';
import { IPostoffice } from 'src/app/Modules/CMS/Institution/Institution';
import { StudentService } from '../student.service';
import { FrameworkService } from 'src/app/Shared/framework/framework.service';
import { ITableSettings } from 'src/app/Shared/framework/table/table.model';
import { IDocumentLibraryAdd } from 'src/app/Modules/Document/documentlibrary';

@Component({
  selector: 'app-AddStudent',
  templateUrl: './AddStudent.component.html',
  styleUrls: ['./AddStudent.component.css'],
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddStudentComponent implements OnInit {
  // #region arrays (1)
  public DocumentLibraryList: IDocumentLibraryAdd[] = [];
  // #endregion

  // #region booleans (2)
  public agetrigger: boolean = false;
  public boardingPoint: boolean = false;
  public brother: boolean = false;
  public CommunicationpostaltriggerApi: boolean = false;
  public ifscvalidation: boolean = false;
  public parmanentpostaltriggerApi: boolean = false;
  public scholarship: boolean = false;
  public Scgroup: boolean = false;
  public showcollegedetails: boolean = false;
  public showschooldetails: boolean = false;
  public triggercourseApi: boolean = false;
  public triggerdepartmentApi: boolean = false;
  public triggersectionApi: boolean = false;
  public triggerSemesteryearApi: boolean = false;
  // #endregion

  // #region objects (3)
  public CommunicationAddressrequest: IPostoffice = { Pincode: '' };
  public courseTypeandDepartmentCodeRequest: CommonCourseTypeAndDepartmentCodeRequestBase =
    new CommonCourseTypeAndDepartmentCodeRequestBase();
  public Casterequest: CommonAutocompleteRequest = new CommonAutocompleteRequest({
    tableName: 'StudentDetails',
    columnName: 'Caste',
    searchParam: '',
  });
  public departmentrequest: CommonCourseTypeRequestBase = new CommonCourseTypeRequestBase();
  public DocumentLibraryRequest: IDocumentLibraryAdd = {
    fileName: '',
    contentType: '',
    data: '',
    fileType: '',
  };
  public motherTonguerequest: CommonAutocompleteRequest = new CommonAutocompleteRequest({
    tableName: 'StudentDetails',
    columnName: 'MotherTongue',
    searchParam: '',
  });
  public parmanentpostalrequest: IPostoffice = { Pincode: '' };
  public request: StudentDetailInsertRequest = new StudentDetailInsertRequest();
  public schoolNamerequest: CommonAutocompleteRequest = new CommonAutocompleteRequest({
    tableName: 'StudentDetails',
    columnName: 'SchoolName',
    searchParam: '',
  });
  public sectionRequest: CommonCourseCodeRequest = new CommonCourseCodeRequest();
  public SemesterYearRequest: CommonSemesterYearRequest = new CommonSemesterYearRequest();
  public specializationrequest: CommonAutocompleteRequest = new CommonAutocompleteRequest({
    tableName: 'StudentDetails',
    columnName: 'Specialization',
    searchParam: '',
  });
  public studentrequest: IStudentRequest = {
    studentdetails: this.request,
    documentrequests: this.DocumentLibraryList,
  };
  public studiedGrouprequest: CommonAutocompleteRequest = new CommonAutocompleteRequest({
    tableName: 'StudentDetails',
    columnName: 'StudiedGroup',
    searchParam: '',
  });
  public subject1Namerequest: CommonAutocompleteRequest = new CommonAutocompleteRequest({
    tableName: 'StudentDetails',
    columnName: 'SubjectName1',
    searchParam: '',
  });
  public subject2Namerequest: CommonAutocompleteRequest = new CommonAutocompleteRequest({
    tableName: 'StudentDetails',
    columnName: 'SubjectName2',
    searchParam: '',
  });
  public subject3Namerequest: CommonAutocompleteRequest = new CommonAutocompleteRequest({
    tableName: 'StudentDetails',
    columnName: 'SubjectName3',
    searchParam: '',
  });
  public subject4Namerequest: CommonAutocompleteRequest = new CommonAutocompleteRequest({
    tableName: 'StudentDetails',
    columnName: 'SubjectName4',
    searchParam: '',
  });
  public subject5Namerequest: CommonAutocompleteRequest = new CommonAutocompleteRequest({
    tableName: 'StudentDetails',
    columnName: 'SubjectName5',
    searchParam: '',
  });
  public subject6Namerequest: CommonAutocompleteRequest = new CommonAutocompleteRequest({
    tableName: 'StudentDetails',
    columnName: 'SubjectName6',
    searchParam: '',
  });
  public universityNamerequest: CommonAutocompleteRequest = new CommonAutocompleteRequest({
    tableName: 'StudentDetails',
    columnName: 'UniversityName',
    searchParam: '',
  });
  public instituionNamerequest: CommonAutocompleteRequest = new CommonAutocompleteRequest({
    tableName: 'StudentDetails',
    columnName: 'InstituionName',
    searchParam: '',
  });
  // #endregion

  // #region strings (4)
  public age: string = '';
  // #endregion

  // #region objects (5)
  public tableSettingsDocument: ITableSettings = {
    showFotter: false,
    showPagination: false,
    jsonData: this.DocumentLibraryList,
    shorting: true,
    slno: true,
    checkbox: false,
    columns: [
      {
        title: 'File Name',
        data: 'fileName',
        short: true,
        width: 30,
      },
      {
        title: 'File Type',
        data: 'fileType',
        short: true,
        width: 30,
      },
      {
        title: 'File Size',
        data: 'data',
        short: true,
        width: 20,
        render: (row: any) => this.GetFileSize(row),
      },
      {
        title: 'Action',
        data: 'Mat-Action',
        width: 20,
        buttongroup: [
          {
            button: true,
            buttondata: 'institutionName',
            buttons: ['delete'],
            conditions: ['toggle|status|Active'],
          },
        ],
        buttonlabel: 'institutionName',
      },
    ],
    columnSticky: [0, 1],
    headerSticky: true,
    filter: false,
  };
  // #endregion

  constructor(
    private staffService: StaffService,
    private studentService: StudentService,
    private cdr: ChangeDetectorRef,
    private fw: FrameworkService,
  ) {}

  ngOnInit() {}

  // #region functions
  // #region Parmanent Address Change
  onParmanentAddressPincodeChanges() {
    if (this.request.parmanentAddressPincode.length == 6) {
      this.parmanentpostalrequest.Pincode = this.request.parmanentAddressPincode;
      this.parmanentpostaltriggerApi = true;
    }
  }
  onParmanentAddressPostOfficeValueChanges(options: { value: string; text: string }) {
    // Handle the change event here
    this.request.parmanentAddressPostOffice = options.value;
  }
  onParmanentAddressPostOfficeAPIResponse(Response: any) {
    if (Response != null) {
      this.request.parmanentAddressState = Response[0].stateName;
      this.request.parmanentAddressDistrict = Response[0].districtname;
    }
  }
  // #endregion
  // #region Communication Address Change
  onCommunicationAddressPincodeChanges() {
    if (this.request.communicationAddressPincode.length == 6) {
      this.CommunicationAddressrequest.Pincode = this.request.communicationAddressPincode;
      this.CommunicationpostaltriggerApi = true;
    }
  }
  onCommunicationAddressPostOfficeValueChanges(options: { value: string; text: string }) {
    // Handle the change event here
    this.request.communicationAddressPostOffice = options.value;
  }
  onCommunicationAddressPostOfficeAPIResponse(Response: any) {
    if (Response != null) {
      this.request.communicationAddressState = Response[0].stateName;
      this.request.communicationAddressDistrict = Response[0].districtname;
    }
  }
  onCheckboxValueChange(isChecked: boolean): void {
    if (isChecked) {
      this.request.communicationAddress1 = this.request.parmanentAddress1;
      this.request.communicationAddress2 = this.request.parmanentAddress2;
      this.request.communicationAddressPincode = this.request.parmanentAddressPincode;
      this.CommunicationAddressrequest.Pincode = this.request.communicationAddressPincode;
      this.request.communicationAddressPostOffice = this.request.parmanentAddressPostOffice;
      this.request.communicationAddressDistrict = this.request.parmanentAddressDistrict;
      this.request.communicationAddressState = this.request.parmanentAddressState;
      this.CommunicationpostaltriggerApi = true;
    }
  }
  // #endregion
  onifscChange() {
    if (this.request.ifscCode.length > 0) {
      this.ifscvalidation = true;
      this.staffService.getIFSCDetails(this.request.ifscCode).subscribe({
        next: (Response) => {
          this.request.bankName = Response.BANK;
          this.request.bankAddress = Response.ADDRESS;
          this.request.micrCode = Response.MICR;
        },
        error: (err) => {
          // Handle the error here, such as showing an error message or setting default values
          this.request.bankName = '';
          this.request.bankAddress = '';
          this.request.micrCode = '';
          // You can also add any additional error-handling logic here
        },
      });
    } else {
      this.request.bankName = '';
      this.request.bankAddress = '';
      this.request.micrCode = '';
      this.ifscvalidation = false;
    }
  }
  onMarkChange(): void {
    const totalMaxMark = Number(this.request.totalMaxMark); // Convert to number
    const maxmark = totalMaxMark === 600 ? 100 : 200;

    // List of subject keys
    const subjects = [
      'subject1Mark',
      'subject2Mark',
      'subject3Mark',
      'subject4Mark',
      'subject5Mark',
      'subject6Mark',
    ] as const;

    // Validate and cap subject marks
    subjects.forEach((subject) => {
      const mark = Number(this.request[subject]); // Convert to number explicitly
      if (mark > maxmark) {
        this.request[subject] = maxmark;
      } else if (isNaN(mark) || mark == null) {
        this.request[subject] = 0; // Default to 0 if invalid
      } else {
        this.request[subject] = mark;
      }
    });

    // Calculate total HSC mark
    this.request.hscmark = subjects.reduce(
      (sum, subject) => sum + Number(this.request[subject] || 0),
      0,
    );

    // Calculate percentage and restrict to two decimal places
    this.request.hscmarkPercentage =
      totalMaxMark > 0 ? parseFloat(((this.request.hscmark / totalMaxMark) * 100).toFixed(2)) : 0;
  }
  onCourseTypeChange() {
    const courseType = this.request.courseType;
    let userJSON = localStorage.getItem('CMSToken');
    if (userJSON == null) {
      return;
    }
    const value = JSON.parse(userJSON);
    if (value.institutionType == 'Education') {
      this.showcollegedetails == true;
    } else {
      // Toggle visibility based on course type
      this.showschooldetails = courseType === 'UG';
      this.showcollegedetails = courseType === 'PG';

      // Update course type in related requests
      this.departmentrequest.courseType = courseType;
      this.courseTypeandDepartmentCodeRequest.courseType = courseType;
      this.request.departmentCode = '';

      if (courseType === 'PG') {
        this.resetSchoolDetails(); // Reset school details for PG
      } else if (courseType === 'UG') {
        this.resetCollegeDetails(); // Reset college details for UG
        this.resetSubjectMarks(); // Ensure marks and total max marks are reset
      }
    }
  }
  resetSchoolDetails(): void {
    Object.assign(this.request, {
      schoolName: '',
      monthAndYearOfPassing: '',
      studiedGroup: '',
      hscrollNo: '',
      subject1Name: '',
      subject1Mark: 0,
      subject2Name: '',
      subject2Mark: 0,
      subject3Name: '',
      subject3Mark: 0,
      subject4Name: '',
      subject4Mark: 0,
      subject5Name: '',
      subject5Mark: 0,
      subject6Name: '',
      subject6Mark: 0,
      hscmark: 0,
      hscmarkPercentage: 0,
      totalMaxMark: 600,
      mediumOfStudy: '',
      emisno: '',
      examinationPassed: '',
    });
  }

  resetCollegeDetails(): void {
    Object.assign(this.request, {
      studiedDegreeType: null,
      studiedDegree: null,
      yearOfPassing: null,
      universityName: null,
      instituionName: null,
      studiedMode: null,
      passPercentage: null,
      specialization: null,
    });
  }

  resetSubjectMarks(): void {
    Object.assign(this.request, {
      subject1Mark: 0,
      subject2Mark: 0,
      subject3Mark: 0,
      subject4Mark: 0,
      subject5Mark: 0,
      subject6Mark: 0,
      totalMaxMark: 600,
    });
  }
  onDepartmentChange() {
    this.courseTypeandDepartmentCodeRequest.departmentCode = this.request.departmentCode;
    this.request.courseCode = '';
  }
  onCourseChange() {
    this.sectionRequest.courseCode = this.request.courseCode;
    this.request.section = '';
  }
  onSemesterChange() {
    this.SemesterYearRequest.semester = this.request.semester;
    this.studentService.getSemesterYear(this.SemesterYearRequest).subscribe({
      next: (Response) => {
        this.request.courseYear = Response.data;
        this.cdr.detectChanges();
      },
      error: (err) => {},
    });
  }
  onChildValueChange(newValue: any): void {
    const { studentdetails, documentrequests } = newValue;
    this.request = studentdetails;
    this.DocumentLibraryList = documentrequests;

    // Postal requests
    this.parmanentpostalrequest.Pincode = this.request.parmanentAddressPincode;
    this.CommunicationAddressrequest.Pincode = this.request.communicationAddressPincode;

    // Trigger postal APIs based on valid Pincode values
    this.CommunicationpostaltriggerApi = !!this.CommunicationAddressrequest.Pincode;
    this.parmanentpostaltriggerApi = !!this.parmanentpostalrequest.Pincode;

    // Trigger age-related updates
    this.agetrigger = true;
    this.updateStudentRequest();

    // Department and course-related requests
    const { courseType, departmentCode, courseCode } = this.request;
    this.departmentrequest.courseType = courseType;
    this.courseTypeandDepartmentCodeRequest = { courseType, departmentCode };
    this.sectionRequest.courseCode = courseCode;

    // Trigger APIs based on valid values
    this.triggerdepartmentApi = !!courseType;
    this.triggercourseApi = !!this.courseTypeandDepartmentCodeRequest.courseType;
    this.triggersectionApi = !!courseCode;
    this.showschooldetails = this.request.courseType === 'UG';
    this.showcollegedetails = this.request.courseType === 'PG';
    this.onscholarShipChange();
    if (this.request.scholarShip == 'Yes') {
      this.onSCChange();
    }
  }
  // #region Document List Add and Remove
  AddDocment() {
    const existingIndex = this.DocumentLibraryList.findIndex(
      (item) => item.fileType.toLowerCase() === this.DocumentLibraryRequest.fileType.toLowerCase(),
    );
    if (existingIndex !== -1) {
      // Update the existing language entry
      this.DocumentLibraryList[existingIndex] = {
        ...this.DocumentLibraryRequest,
      };
      this.DocumentLibraryList = [...this.DocumentLibraryList];
    } else {
      // Add a new language entry if it doesn't exist
      this.DocumentLibraryList.push({ ...this.DocumentLibraryRequest });
      this.DocumentLibraryList = [...this.DocumentLibraryList];
    }
    this.DocumentLibraryRequest = {
      fileName: '',
      contentType: '',
      data: '',
      fileType: '',
    };
  }
  GetFileSize(row: any): string {
    return this.fw.getFileSizeFromBase64(row['data']);
  }
  DocumentRemove(remove: any) {
    if (remove != null) {
      this.DocumentLibraryList = this.DocumentLibraryList.filter(
        (item) => item.fileType.toLowerCase() !== remove.fileType.toLowerCase(),
      );
    }
  }
  updateStudentRequest(): void {
    this.studentrequest = {
      studentdetails: this.request,
      documentrequests: this.DocumentLibraryList,
    };
  }
  // #endregion
  onscholarShipChange() {
    if (this.request.scholarShip == 'Yes') {
      this.scholarship = true;
      this.Scgroup = true;
    } else {
      this.scholarship = false;
      this.Scgroup = false;
      this.request.scholarShipType = '';
      this.request.charityScholarship = '';
      this.request.managementScholarship = '';
    }
  }
  onbroSysStudyingStudiedChange() {
    if (this.request.broSysStudyingStudied == 'Yes') {
      this.brother = true;
    } else {
      this.brother = false;
      this.request.nameBroSys = '';
    }
  }
  onmodeOfTransportChange() {
    if (this.request.modeOfTransport == 'College bus') {
      this.boardingPoint = true;
    } else {
      this.boardingPoint = false;
    }
  }
  onRespons() {
    this.request = new StudentDetailInsertRequest();
    this.DocumentLibraryList = [];
    this.DocumentLibraryList = [...this.DocumentLibraryList];
    this.updateStudentRequest();
  }
  onSCChange() {
    if (
      this.request.scholarShipType != '' ||
      this.request.charityScholarship != '' ||
      this.request.managementScholarship != ''
    ) {
      this.Scgroup = false;
    } else {
      this.Scgroup = true;
    }
  }
}
