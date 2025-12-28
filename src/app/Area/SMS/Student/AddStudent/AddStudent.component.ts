import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import {
  CommonAutocompleteRequest,
  CommonCourseCodeRequest,
  CommonCourseTypeAndDepartmentCodeRequestBase,
  CommonCourseTypeRequestBase,
  CommonSemesterYearRequest,
} from 'src/app/Global/Interface/common-interface';
import { StaffService } from '../../Staff/staff.service';
import { FrameworkService } from 'src/app/Shared/framework/framework.service';
import { ITableSettings } from 'src/app/Shared/framework/table/table.model';
import { IDocumentLibraryAdd } from 'src/app/Modules/Document/documentlibrary';
import {
  IStudentRequest,
  StudentDetailInsertRequest,
} from 'src/app/Modules/SMS/Student/StudentRequest';
import { IPostoffice } from 'src/app/Modules/SMS/Staff/StaffRequest';
import { ClassSectionRequest } from 'src/app/Modules/SMS/ClassSection/ClassSection.Request';

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
  sectionrequest: ClassSectionRequest = new ClassSectionRequest();
  public CommunicationAddressrequest: IPostoffice = new IPostoffice();
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
  public parmanentpostalrequest: IPostoffice = new IPostoffice();
  public request: StudentDetailInsertRequest = new StudentDetailInsertRequest();
  public schoolNamerequest: CommonAutocompleteRequest = new CommonAutocompleteRequest({
    tableName: 'StudentDetails',
    columnName: 'SchoolName',
    searchParam: '',
  });
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
    private cdr: ChangeDetectorRef,
    private fw: FrameworkService,
  ) {}

  ngOnInit() {}

  // #region functions
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
    const { studentdetails, documentrequests } = newValue;
    this.request = studentdetails;
    this.DocumentLibraryList = documentrequests;

    // Postal requests
    this.parmanentpostalrequest.pincode = this.request.parmanentAddressPincode;
    this.CommunicationAddressrequest.pincode = this.request.communicationAddressPincode;

    // Trigger postal APIs based on valid Pincode values
    this.CommunicationpostaltriggerApi = !!this.CommunicationAddressrequest.pincode;
    this.parmanentpostaltriggerApi = !!this.parmanentpostalrequest.pincode;

    // Trigger age-related updates
    this.agetrigger = true;
    this.updateStudentRequest();
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

  onbroSysStudyingStudiedChange() {
    if (this.request.broSysStudyingStudied == 'Yes') {
      this.brother = true;
    } else {
      this.brother = false;
      this.request.nameBroSys = '';
    }
  }
  onmodeOfTransportChange() {
    if (this.request.modeOftransport == 'College bus') {
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
}
