// #region import
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import {
  CommonAutocompleteRequest,
  CommonCourseCodeRequest,
  CommonCourseTypeAndDepartmentCodeRequestBase,
  CommonCourseTypeRequestBase,
  CommonSemesterYearRequest,
  TableRecordInfo,
} from 'src/app/Global/Interface/common-interface';
import {
  StudentDetailPKRequest,
  StudentDetailUpdateRequest,
} from 'src/app/Modules/CMS/Student/Student';
import { StaffService } from '../../Staff/staff.service';
import { IPostoffice } from 'src/app/Modules/CMS/Institution/Institution';
import { StudentService } from '../student.service';
import { FrameworkService } from 'src/app/Shared/framework/framework.service';
import { ITableSettings } from 'src/app/Shared/framework/table/table.model';
import {
  IDocumentLibraryAddByfkid,
  IDocumentLibraryList,
} from 'src/app/Modules/Document/documentlibrary';
import { SessionService } from 'src/app/Shared/framework/Session.service';
import { Router } from '@angular/router';
import { DocumentService } from 'src/app/Global/Service/document.service';
import { IHistoryRecordParameter } from 'src/app/Shared/framework/historyrecord/historyrecord';
import { IResetPasswordParameter } from 'src/app/Shared/framework/icon/key/key';
// #endregion

@Component({
  selector: 'app-viewStudent',
  templateUrl: './viewStudent.component.html',
  styleUrls: ['./viewStudent.component.css'],
  standalone: false,
})
export class ViewStudentComponent implements OnInit {
  // #region Parameter declaration
  public _resetPassword: IResetPasswordParameter = new IResetPasswordParameter();
  request: StudentDetailUpdateRequest = new StudentDetailUpdateRequest();
  requestPK: StudentDetailPKRequest = new StudentDetailPKRequest();
  public recordinfo: TableRecordInfo = new TableRecordInfo();
  public _historyrecordParameter: IHistoryRecordParameter = new IHistoryRecordParameter();
  age: string = '';
  agetrigger: boolean = false;
  ifscvalidation: boolean = false;
  showschooldetails: boolean = false;
  showcollegedetails: boolean = false;
  scholarship: boolean = false;
  brother: boolean = false;
  boardingPoint: boolean = false;
  editStuddoc: boolean = false;
  Scgroup: boolean = false;
  // #region Auto Complete declarations
  Casterequest: CommonAutocompleteRequest = new CommonAutocompleteRequest({
    tableName: 'StudentDetails',
    columnName: 'Caste',
    searchParam: '',
  });
  motherTonguerequest: CommonAutocompleteRequest = new CommonAutocompleteRequest({
    tableName: 'StudentDetails',
    columnName: 'MotherTongue',
    searchParam: '',
  });
  schoolNamerequest: CommonAutocompleteRequest = new CommonAutocompleteRequest({
    tableName: 'StudentDetails',
    columnName: 'SchoolName',
    searchParam: '',
  });
  studiedGrouprequest: CommonAutocompleteRequest = new CommonAutocompleteRequest({
    tableName: 'StudentDetails',
    columnName: 'StudiedGroup',
    searchParam: '',
  });
  subject1Namerequest: CommonAutocompleteRequest = new CommonAutocompleteRequest({
    tableName: 'StudentDetails',
    columnName: 'SubjectName1',
    searchParam: '',
  });
  subject2Namerequest: CommonAutocompleteRequest = new CommonAutocompleteRequest({
    tableName: 'StudentDetails',
    columnName: 'SubjectName2',
    searchParam: '',
  });
  subject3Namerequest: CommonAutocompleteRequest = new CommonAutocompleteRequest({
    tableName: 'StudentDetails',
    columnName: 'SubjectName3',
    searchParam: '',
  });
  subject4Namerequest: CommonAutocompleteRequest = new CommonAutocompleteRequest({
    tableName: 'StudentDetails',
    columnName: 'SubjectName4',
    searchParam: '',
  });
  subject5Namerequest: CommonAutocompleteRequest = new CommonAutocompleteRequest({
    tableName: 'StudentDetails',
    columnName: 'SubjectName5',
    searchParam: '',
  });
  subject6Namerequest: CommonAutocompleteRequest = new CommonAutocompleteRequest({
    tableName: 'StudentDetails',
    columnName: 'SubjectName6',
    searchParam: '',
  });
  universityNamerequest: CommonAutocompleteRequest = new CommonAutocompleteRequest({
    tableName: 'StudentDetails',
    columnName: 'UniversityName',
    searchParam: '',
  });
  instituionNamerequest: CommonAutocompleteRequest = new CommonAutocompleteRequest({
    tableName: 'StudentDetails',
    columnName: 'InstituionName',
    searchParam: '',
  });
  specializationrequest: CommonAutocompleteRequest = new CommonAutocompleteRequest({
    tableName: 'StudentDetails',
    columnName: 'Specialization',
    searchParam: '',
  });
  // #endregion
  departmentrequest: CommonCourseTypeRequestBase = new CommonCourseTypeRequestBase();
  triggerdepartmentApi: boolean = false;
  courseTypeandDepartmentCodeRequest: CommonCourseTypeAndDepartmentCodeRequestBase =
    new CommonCourseTypeAndDepartmentCodeRequestBase();
  triggercourseApi: boolean = false;
  sectionRequest: CommonCourseCodeRequest = new CommonCourseCodeRequest();
  triggersectionApi: boolean = false;
  SemesterYearRequest: CommonSemesterYearRequest = new CommonSemesterYearRequest();
  triggerSemesteryearApi: boolean = false;
  public parmanentpostalrequest: IPostoffice = {
    Pincode: '',
  };
  parmanentpostaltriggerApi: boolean = false;
  public CommunicationAddressrequest: IPostoffice = {
    Pincode: '',
  };
  CommunicationpostaltriggerApi: boolean = false;
  // #endregion

  // #region Document Lirary declaration
  DocumentLibraryList: IDocumentLibraryList[] = [];
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
        data: 'fileSize',
        short: true,
        width: 20,
        render: (row: any) => this.fw.formatFileSize(row['fileSize']),
      },
      {
        title: 'Action',
        data: 'Mat-Action',
        width: 20,
        buttongroup: [
          {
            button: true,
            buttondata: 'sysid',
            buttons: ['delete', 'info', 'edit', 'download', 'history'],
            click: [
              'delete|sysid|fileName|/DocumentLibrary/DeleteDocument|sysid|Are sure you want to Delete : <span class="text-danger">{{0}}</span>||true',
              'history|DocumentLibrary|sysid|',
            ],
            conditions: ['delete|fileSize|!0', 'download|fileSize|!0'],
          },
        ],
        buttonlabel: 'sysid',
      },
    ],
    columnSticky: [0, 1],
    headerSticky: true,
    filter: false,
  };
  public DocumentLibraryRequest: IDocumentLibraryAddByfkid = {
    fileName: '',
    contentType: '',
    data: '',
    fileType: '',
    fkid: 0,
  };

  // #endregion
  constructor(
    private staffService: StaffService,
    private studentService: StudentService,
    private cdr: ChangeDetectorRef,
    private fw: FrameworkService,
    private sessionService: SessionService,
    private router: Router,
    private ds: DocumentService,
  ) {}

  ngOnInit() {
    this.requestPK.sysId = this.sessionService.getStudentEditId();
    this.DocumentLibraryRequest.fkid = this.requestPK.sysId;
    this._historyrecordParameter.tableName = 'StudentDetails';
    this._historyrecordParameter.fID = this.requestPK.sysId;
    if (this.requestPK.sysId == 0) {
      this.navigateToStudentList();
    } else {
      this.GetStudentDetails();
    }
    this._resetPassword.sysid = this.requestPK.sysId;
    this._resetPassword.api = '/Student/ResetStudentPassword';
    this._resetPassword.bodyMessage =
      "Are you sure you want to reset the password to the student's default date of birth?";
    this._resetPassword.parameterkey = 'sysId';
  }
  navigateToStudentList(): void {
    this.router.navigate(['CMS/ViewStudentlist']);
  }
  GetStudentDetails(): void {
    this.studentService.getStudentDetailsSysid(this.requestPK).subscribe({
      next: (Response) => {
        if (Response.data != null) {
          this.request = Response.data.studentDetail;
          this.parmanentpostalrequest.Pincode = this.request.parmanentAddressPincode;
          this.CommunicationAddressrequest.Pincode = this.request.communicationAddressPincode;
          if (this.CommunicationAddressrequest.Pincode.length == 6) {
            this.CommunicationpostaltriggerApi = true;
          }
          if (this.parmanentpostalrequest.Pincode.length == 6) {
            this.parmanentpostaltriggerApi = true;
          }
          this.agetrigger = true;
          this.DocumentLibraryList = Response.data.studentDocument;
          this.departmentrequest.courseType = this.request.courseType;
          this.courseTypeandDepartmentCodeRequest.courseType = this.request.courseType;
          this.courseTypeandDepartmentCodeRequest.departmentCode = this.request.departmentCode;
          this.sectionRequest.courseCode = this.request.courseCode;
          this.triggerdepartmentApi = true;
          this.triggercourseApi = true;
          this.triggersectionApi = true;
          let userJSON = localStorage.getItem('CMSToken');
          if (userJSON == null) {
            return;
          }
          const value = JSON.parse(userJSON);
          if (value.institutionType == 'Education') {
            this.showcollegedetails = true;
          } else {
            this.showschooldetails = this.request.courseType === 'UG';
            this.showcollegedetails = this.request.courseType === 'PG';
          }

          this.onSemesterChange();
          this.onscholarShipChange();

          this.recordinfo.enteredBy = Response.data.studentDetail.entredBy;
          this.recordinfo.entryDate = this.fw.formatDateTime(Response.data.studentDetail.entrydate);
          this.recordinfo.modifiedBy = Response.data.studentDetail.modifiedBy;
          this.recordinfo.modifiedDate = this.fw.formatDateTime(
            Response.data.studentDetail.modifiedDate,
          );
          if (this.request.scholarShip == 'Yes') {
            this.onSCChange();
          }

          this.cdr.detectChanges();
        }
      },
    });
  }
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
    }
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
    this.request = newValue;

    this.parmanentpostalrequest.Pincode = this.request.parmanentAddressPincode;
    this.CommunicationAddressrequest.Pincode = this.request.communicationAddressPincode;
    this.CommunicationpostaltriggerApi = true;
    this.parmanentpostaltriggerApi = true;

    this.agetrigger = true;
  }
  // #region Document List Add and Remove
  AddDocument() {
    this.studentService.AddDocument(this.DocumentLibraryRequest).subscribe({
      next: (Response) => {
        if (Response.status == 200) {
          this.GetStudentDocument();
          this.resetDocumentForm();
        }
      },
    });
  }
  GetStudentDocument() {
    this.studentService.GetStudentDocument(this.requestPK).subscribe({
      next: (Response) => {
        if (Response.status == 200) {
          this.DocumentLibraryList = Response.data;
        }
      },
    });
  }
  resetDocumentForm() {
    this.DocumentLibraryRequest = {
      fileName: '',
      contentType: '',
      data: '',
      fileType: '',
      fkid: this.requestPK.sysId,
    };
  }
  onEditDocumentClick(recordId: any): void {
    const selectedRecord = this.DocumentLibraryList.find((record) => record.sysid === recordId);
    if (selectedRecord) {
      this.DocumentLibraryRequest = {
        fileName: '',
        contentType: '',
        data: '',
        fileType: selectedRecord.fileType?.toString() || '',
        fkid: recordId,
      };
    }
    this.editStuddoc = true;
    this.cdr.detectChanges();
  }
  UpdateDocument() {
    this.ds.UpdateDocument(this.DocumentLibraryRequest).subscribe({
      next: (Response) => {
        if (Response.status == 200) {
          this.editStuddoc = false;
          this.resetDocumentForm();
          this.GetStudentDocument();
        }
      },
    });
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
  UpdateStudent() {
    console.log(this.request);
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
