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
import { StaffService } from '../../Staff/staff.service';
import { StudentService } from '../student.service';
import { FrameworkService } from 'src/app/Shared/framework/framework.service';
import { ITableSettings } from 'src/app/Shared/framework/table/table.model';
import {
  IDocumentLibraryAddByFkid,
  IDocumentLibraryList,
} from 'src/app/Modules/Document/documentlibrary';
import { SessionService } from 'src/app/Shared/framework/Session.service';
import { Router } from '@angular/router';
import { DocumentService } from 'src/app/Global/Service/document.service';
import { IHistoryRecordParameter } from 'src/app/Shared/framework/historyrecord/historyrecord';
import { IResetPasswordParameter } from 'src/app/Shared/framework/icon/key/key';
import {
  StudentDetailRequest,
  StudentDetailUpdateRequest,
} from 'src/app/Modules/SMS/Student/StudentRequest';
import { IPostoffice } from 'src/app/Modules/SMS/Staff/StaffRequest';
import { ClassSectionRequest } from 'src/app/Modules/SMS/ClassSection/ClassSection.Request';
// #endregion

@Component({
  selector: 'app-viewStudent',
  templateUrl: './viewStudent.component.html',
  styleUrls: ['./viewStudent.component.css'],
  standalone: false,
})
export class ViewStudentComponent implements OnInit {
  // #region Parameter declaration
  sectionrequest: ClassSectionRequest = new ClassSectionRequest();
  public _resetPassword: IResetPasswordParameter = new IResetPasswordParameter();
  request: StudentDetailUpdateRequest = new StudentDetailUpdateRequest();
  requestPK: StudentDetailRequest = new StudentDetailRequest();
  public recordinfo: TableRecordInfo = new TableRecordInfo();
  public _historyrecordParameter: IHistoryRecordParameter = new IHistoryRecordParameter();
  public _historyrecordClass: IHistoryRecordParameter = new IHistoryRecordParameter();
  age: string = '';
  agetrigger: boolean = false;
  triggerclassApi: boolean = false;
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
  public parmanentpostalrequest: IPostoffice = new IPostoffice();
  parmanentpostaltriggerApi: boolean = false;
  public CommunicationAddressrequest: IPostoffice = new IPostoffice();
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
  public DocumentLibraryRequest: IDocumentLibraryAddByFkid = {
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
    this.requestPK.sysid = this.sessionService.getStudentEditId();
    this.DocumentLibraryRequest.fkid = this.requestPK.sysid;
    this._historyrecordParameter.tableName = 'StudentDetails';
    this._historyrecordParameter.fID = this.requestPK.sysid;
    this._historyrecordClass.tableName = 'StudentClassDetails';
    this._historyrecordClass.fID = this.requestPK.sysid;
    if (this.requestPK.sysid == 0) {
      this.navigateToStudentList();
    } else {
      this.GetStudentDetails();
    }
    this._resetPassword.sysid = this.requestPK.sysid;
    this._resetPassword.api = '/Student/ResetStudentPassword';
    this._resetPassword.bodyMessage =
      "Are you sure you want to reset the password to the student's default date of birth?";
    this._resetPassword.parameterkey = 'sysId';
  }
  navigateToStudentList(): void {
    this.router.navigate(['SMS/ViewStudentList']);
  }
  GetStudentDetails(): void {
    this.studentService.getStudentDetailsSysid(this.requestPK).subscribe({
      next: (Response) => {
        if (Response.data != null) {
          this.request = Response.data.studentDetail;
          this.sectionrequest.classFkid = this.request.classSysId;
          this.parmanentpostalrequest.pincode = this.request.parmanentAddressPincode;
          this.CommunicationAddressrequest.pincode = this.request.communicationAddressPincode;
          if (this.CommunicationAddressrequest.pincode.length == 6) {
            this.CommunicationpostaltriggerApi = true;
          }
          if (this.parmanentpostalrequest.pincode.length == 6) {
            this.parmanentpostaltriggerApi = true;
          }
          this.agetrigger = true;
          this.DocumentLibraryList = Response.data.studentDocument;

          this.triggerclassApi = true;
          this.triggersectionApi = true;
          this.recordinfo.enteredBy = Response.data.studentDetail.entredBy;
          this.recordinfo.entryDate = this.fw.formatDateTime(Response.data.studentDetail.entrydate);
          this.recordinfo.modifiedBy = Response.data.studentDetail.modifiedBy;
          this.recordinfo.modifiedDate = this.fw.formatDateTime(
            Response.data.studentDetail.modifiedDate,
          );

          this.cdr.detectChanges();
        }
      },
    });
  }
  // #region Parmanent Address Change
  onParmanentAddressPincodeChanges() {
    if (this.request.parmanentAddressPincode.length == 6) {
      this.parmanentpostalrequest.pincode = this.request.parmanentAddressPincode;
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
      this.CommunicationAddressrequest.pincode = this.request.communicationAddressPincode;
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
      this.CommunicationAddressrequest.pincode = this.request.communicationAddressPincode;
      this.request.communicationAddressPostOffice = this.request.parmanentAddressPostOffice;
      this.request.communicationAddressDistrict = this.request.parmanentAddressDistrict;
      this.request.communicationAddressState = this.request.parmanentAddressState;
      this.CommunicationpostaltriggerApi = true;
    }
  }
  // #endregion

  onChildValueChange(newValue: any): void {
    this.request = newValue;

    this.parmanentpostalrequest.pincode = this.request.parmanentAddressPincode;
    this.CommunicationAddressrequest.pincode = this.request.communicationAddressPincode;
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
      fkid: this.requestPK.sysid,
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

  onbroSysStudyingStudiedChange() {
    if (this.request.broSysStudyingStudied == 'Yes') {
      this.brother = true;
    } else {
      this.brother = false;
      this.request.nameBroSys = '';
    }
  }
  onmodeOfTransportChange() {
    if (this.request.modeOftransport == 'School bus') {
      this.boardingPoint = true;
    } else {
      this.boardingPoint = false;
    }
  }
  onClassChange() {
    this.sectionrequest.classFkid = this.request.classSysId;
    this.request.classSectionSysId = 0;
  }
}
