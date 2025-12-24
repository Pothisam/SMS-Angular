import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SessionService } from 'src/app/Shared/framework/Session.service';

import { ITableSettings } from 'src/app/Shared/framework/table/table.model';
import { StaffService } from '../staff.service';
import { FrameworkService } from 'src/app/Shared/framework/framework.service';
import { from } from 'rxjs';
import { concatMap, mergeMap } from 'rxjs/operators';

import { TableRecordInfo } from 'src/app/Global/Interface/common-interface';
import { IHistoryRecordParameter } from 'src/app/Shared/framework/historyrecord/historyrecord';
import { IResetPasswordParameter } from 'src/app/Shared/framework/icon/key/key';
import {
  IDocumentLibraryAddByFkid,
  IDocumentLibraryList,
  ProfileRequest,
} from 'src/app/Modules/Document/documentlibrary';
import {
  DocumentLibraryDetailsResponse,
  LanquageKnownResponse,
  StaffEducationResponse,
  StaffExperienceResponse,
  StaffLanguageResponse,
} from 'src/app/Modules/SMS/Staff/StaffResponse';
import {
  IPostoffice,
  IStaffAutocompleteRequest,
  StaffDetailsPKRequest,
  StaffDetailsUpdate,
} from 'src/app/Modules/SMS/Staff/StaffRequest';
@Component({
  selector: 'app-ViewStaff',
  templateUrl: './ViewStaff.component.html',
  styleUrls: ['./ViewStaff.component.css'],
  standalone: false,
})
export class ViewStaffComponent implements OnInit {
  editId: number = 0;
  editStaffeducation: boolean = false;
  editStaffex: boolean = false;
  editStafdoc: boolean = false;
  status: string = 'InActive';
  public _historyrecordParameter: IHistoryRecordParameter = new IHistoryRecordParameter();
  public _resetPassword: IResetPasswordParameter = new IResetPasswordParameter();
  public profileguid: ProfileRequest = new ProfileRequest();
  public recordinfo: TableRecordInfo = new TableRecordInfo();
  // #region All Table List
  LanguageknownList: LanquageKnownResponse[] = [];
  ILanquageKnownList: StaffLanguageResponse[] = [];
  EducationDetailList: StaffEducationResponse[] = [];
  ExperienceDetailList: StaffExperienceResponse[] = [];
  DocumentLibraryList: DocumentLibraryDetailsResponse[] = [];
  // #endregion
  AddLanguageError: string = '';
  staffID: string = '';
  ifscvalidation: boolean = false;
  age: string = '';
  expirence: string = '';
  agetrigger: boolean = false;
  expirencetrigger: boolean = false;

  R: boolean = false;
  W: boolean = false;
  S: boolean = false;
  // #region empty declarations
  public StaffID: StaffDetailsPKRequest = new StaffDetailsPKRequest();
  public LanguageknowRequest: StaffLanguageResponse = new StaffLanguageResponse();
  public EducationDetailRequest: StaffEducationResponse = new StaffEducationResponse();

  public ExperienceDetailRequest: StaffExperienceResponse = new StaffExperienceResponse();
  public DocumentLibraryRequest: IDocumentLibraryAddByFkid = new IDocumentLibraryAddByFkid();

  public request: StaffDetailsUpdate = new StaffDetailsUpdate();

  // #endregion
  // #region auto complete declarations
  public castRequest: IStaffAutocompleteRequest = {
    tableName: 'StaffDetails',
    columnName: 'Cast',
    searchParam: '',
  };
  public languageRequest: IStaffAutocompleteRequest = {
    tableName: 'StaffLanguageDetails',
    columnName: 'LanguageKnow',
    searchParam: '',
  };
  public UniversityNameRequest: IStaffAutocompleteRequest = {
    tableName: 'StaffEducationDetails',
    columnName: 'UniversityName',
    searchParam: '',
  };
  public InstituionNameRequest: IStaffAutocompleteRequest = {
    tableName: 'StaffEducationDetails',
    columnName: 'InstituionName',
    searchParam: '',
  };
  public SpecializationRequest: IStaffAutocompleteRequest = {
    tableName: 'StaffEducationDetails',
    columnName: 'Specialization',
    searchParam: '',
  };
  public AutoInstitutionNameRequest: IStaffAutocompleteRequest = {
    tableName: 'StaffExpirenceDetails',
    columnName: 'InstituionName',
    searchParam: '',
  };
  public PositionRequest: IStaffAutocompleteRequest = {
    tableName: 'StaffExpirenceDetails',
    columnName: 'Position',
    searchParam: '',
  };
  // #endregion

  // #region table settings
  public tableSettingsLanguage: ITableSettings = {
    showFotter: false,
    showPagination: false,
    jsonData: this.LanguageknownList,
    shorting: true,
    slno: true,
    checkbox: false,
    columns: [
      {
        title: 'Language Known',
        data: 'language',
        short: true,
        width: 30,
      },
      {
        title: 'Read',
        data: 'read',
        short: true,
        width: 20,
        render: (row: any) => this.ConverttoYesNo(row, 'read'),
      },
      {
        title: 'Write',
        data: 'write',
        short: true,
        width: 20,
        render: (row: any) => this.ConverttoYesNo(row, 'write'),
      },
      {
        title: 'Speake',
        data: 'speake',
        short: true,
        width: 20,
        render: (row: any) => this.ConverttoYesNo(row, 'speake'),
      },
      {
        title: 'Action',
        data: 'Mat-Action',
        width: 20,
        buttongroup: [
          {
            button: true,
            buttondata: 'sysId',
            buttons: ['delete'],
            click: [
              'delete|sysId|Language|/Staff/DeleteStaffLanguage|sysId|Are sure you want to Delete Language: <span class="text-danger">{{0}}</span>||true',
            ],
          },
        ],
        buttonlabel: 'sysId',
      },
    ],
    columnSticky: [0, 1],
    headerSticky: true,
    filter: false,
  };
  ConverttoYesNo(row: any, columnname: string): string {
    return row[columnname] == true ? 'Yes' : 'No';
  }
  public tableSettingsEducation: ITableSettings = {
    showFotter: false,
    showPagination: false,
    jsonData: this.EducationDetailList,
    shorting: true,
    slno: true,
    checkbox: false,
    columns: [
      {
        title: 'Degree Type',
        data: 'degreeType',
        short: true,
      },
      {
        title: 'Degree',
        data: 'degree',
        short: true,
      },
      {
        title: 'Year of Passing',
        data: 'yearOfPassing',
        short: true,
      },
      {
        title: 'University Name',
        data: 'universityName',
        short: true,
      },
      {
        title: 'Instituion Name',
        data: 'institutionName',
        short: true,
      },
      {
        title: 'Mode',
        data: 'mode',
        short: true,
      },
      {
        title: 'Pass Percentage',
        data: 'passPercentage',
        short: true,
      },
      {
        title: 'Specialization',
        data: 'specialization',
        short: true,
      },
      {
        title: 'Action',
        data: 'Mat-Action',
        width: 10,
        buttongroup: [
          {
            button: true,
            buttondata: 'sysId',
            buttons: ['delete', 'edit'],
            click: [
              'delete|sysId|degree|/Staff/DeleteStaffEducation|sysId|Are sure you want to Delete Degree: <span class="text-danger">{{0}}</span>||true',
            ],
          },
        ],
        buttonlabel: 'sysId',
      },
    ],
    columnSticky: [0, 1],
    headerSticky: true,
    filter: false,
  };
  public tableSettingsExpirence: ITableSettings = {
    showFotter: false,
    showPagination: false,
    jsonData: this.ExperienceDetailList,
    shorting: true,
    slno: true,
    checkbox: false,
    columns: [
      {
        title: 'Institution Name',
        data: 'institutionName',
        short: true,
        width: 30,
      },
      {
        title: 'Position',
        data: 'position',
        short: true,
        width: 20,
      },
      {
        title: 'From',
        data: 'fromDate',
        short: true,
        width: 10,
        render: (row: any) => this.ConvertDate(row, 'fromDate'),
      },
      {
        title: 'To',
        data: 'toDate',
        short: true,
        width: 10,
        render: (row: any) => this.ConvertDate(row, 'toDate'),
      },
      {
        title: 'Year of Experience',
        data: 'yearsOfExperience',
        short: true,
        width: 20,
        render: (row: any) => this.GetExpirenece(row),
      },
      {
        title: 'Salary',
        data: 'salary',
        short: true,
        width: 20,
      },
      {
        title: 'Action',
        data: 'Mat-Action',
        width: 20,
        buttongroup: [
          {
            button: true,
            buttondata: 'sysId',
            buttons: ['delete', 'edit'],
            click: [
              'delete|sysId|institutionName|/Staff/DeleteStaffExperience|sysId|Are sure you want to Delete Expirence of : <span class="text-danger">{{0}}</span>||true',
            ],
          },
        ],
        buttonlabel: 'sysId',
      },
    ],
    columnSticky: [0, 1],
    headerSticky: true,
    filter: false,
  };
  ConvertDate(row: any, columnname: string): string {
    return this.fw.formatDate(row[columnname]);
  }
  GetExpirenece(row: any): string {
    const experience = this.fw.dayDiff(row['fromDate'], row['toDate']);
    return experience !== null ? experience : '';
  }
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
              'delete|sysid|fileName|/Staff/DeleteStafffDocument|sysid|Are sure you want to Delete : <span class="text-danger">{{0}}</span>||true',
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
  // #endregion

  public parmanentpostalrequest: IPostoffice = new IPostoffice();
  parmanentpostaltriggerApi: boolean = false;
  public CommunicationAddressrequest: IPostoffice = new IPostoffice();
  CommunicationpostaltriggerApi: boolean = false;

  constructor(
    private sessionService: SessionService,
    private router: Router,
    private staffService: StaffService,
    private fw: FrameworkService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.editId = this.sessionService.getStaffEditId();
    this.StaffID.sysId = this.editId;
    this.LanguageknowRequest.sysId = this.editId;
    this.EducationDetailRequest.sysId = this.editId;
    this.ExperienceDetailRequest.sysId = this.editId;
    this.DocumentLibraryRequest.fkid = this.editId;

    if (!this.editId) {
      this.navigateToStaffList();
    } else {
      this.getStaffDetailsservice();
    }
    this._historyrecordParameter.tableName = 'StaffDetails';
    this._historyrecordParameter.fID = this.editId;
    this._resetPassword.sysid = this.editId;
    this._resetPassword.api = '/Staff/ResetStaffPassword';
    this._resetPassword.bodyMessage =
      "Are you sure you want to reset the password to the staff's default date of birth?";
    this._resetPassword.parameterkey = 'sysId';
  }
  ngAfterViewInit() {
    this.cdr.detectChanges(); // Notify Angular of the change
    //this.DownloadDocument();
  }
  getStaffDetailsservice() {
    this.staffService.getStaffDetails(this.StaffID).subscribe({
      next: (Response) => {
        if (Response.data != null) {
          this.request = Response.data.staffDetail;
          this.parmanentpostalrequest.pincode = this.request.permanentAddressPincode;
          this.CommunicationAddressrequest.pincode = this.request.communicationAddressPincode;
          this.CommunicationpostaltriggerApi = true;
          this.parmanentpostaltriggerApi = true;
          this.agetrigger = true;
          this.expirencetrigger = true;
          this.ILanquageKnownList = Response.data.staffLanguage;
          this.ReverseConvertLanguage();
          this.EducationDetailList = Response.data.staffEducation;
          this.ExperienceDetailList = Response.data.staffExprience;
          this.DocumentLibraryList = Response.data.staffDocument;
          this.recordinfo.enteredBy = Response.data.staffDetail.enteredBy;
          this.recordinfo.entryDate = this.fw.formatDateTime(Response.data.staffDetail.entryDate);
          this.recordinfo.modifiedBy = Response.data.staffDetail.modifiedBy;
          this.recordinfo.modifiedDate = this.fw.formatDateTime(
            Response.data.staffDetail.modifiedDate,
          );
          this.staffID = Response.data.staffDetail.staffID;
          this.request.sysid = this.editId;
          this.cdr.detectChanges();
        }
      },
    });
  }

  navigateToStaffList(): void {
    this.router.navigate(['SMS/ViewStaffs']);
  }

  // #region Language add remove
  ReverseConvertLanguage() {
    this.LanguageknownList = this.ILanquageKnownList.map(
      (item) =>
        new LanquageKnownResponse({
          sysId: item.sysId,
          language: item.language, // ✅ correct property name
          read: item.readLanguage === 'Yes',
          write: item.writeLanguage === 'Yes',
          speake: item.speakLanguage === 'Yes',
        }),
    );
  }
  onCheckboxValueChange(isChecked: boolean, column: string): void {
    const status = isChecked ? 'Yes' : 'No';

    switch (column) {
      case 'Read':
        this.LanguageknowRequest.readLanguage = status;
        break;
      case 'Write':
        this.LanguageknowRequest.writeLanguage = status;
        break;
      case 'Speake':
        this.LanguageknowRequest.speakLanguage = status;
        break;
      default:
        console.warn(`Unknown column: ${column}`);
    }
  }
  AddLanguage(): void {
    this.AddLanguageError = '';

    const { readLanguage, writeLanguage, speakLanguage, language } = this.LanguageknowRequest;

    // Check if at least one language skill is selected
    const hasSelectedLanguage = [readLanguage, writeLanguage, speakLanguage].includes('Yes');
    if (!hasSelectedLanguage) {
      this.AddLanguageError = 'Please check at least one';
      return;
    }

    // Check for duplicate language entry
    const existingIndex = this.LanguageknownList.findIndex(
      (item) => item.language.toLowerCase() === language.toLowerCase(),
    );

    if (existingIndex !== -1) {
      this.AddLanguageError = 'Duplicate record: This language already exists';
      return;
    }
    this.staffService.AddStaffLanguageDetails(this.LanguageknowRequest).subscribe({
      next: () => {
        this.LanguageknowRequest.language = '';
        this.LanguageknowRequest.readLanguage = 'No';
        this.LanguageknowRequest.writeLanguage = 'No';
        this.LanguageknowRequest.speakLanguage = 'No';
        this.R = false;
        this.W = false;
        this.S = false;
        this.getStaffLanguage();
      },
    });
  }
  getStaffLanguage() {
    this.staffService.GetStaffLanguageDetails(this.StaffID).subscribe({
      next: (Response) => {
        if (Response.data != null) {
          this.ILanquageKnownList = Response.data;
          this.ReverseConvertLanguage();
        }
      },
    });
  }

  // #endregion

  // #region Education
  AddEducation() {
    this.staffService.AddStaffEducationDetails(this.EducationDetailRequest).subscribe({
      next: (Response) => {
        if (Response.status == 200) {
          this.clearAddEducation();
          this.GetStaffEducationDetails();
        }
      },
    });
  }
  clearAddEducation() {
    this.EducationDetailRequest = new StaffEducationResponse();
  }
  GetStaffEducationDetails() {
    this.staffService.GetStaffEducationDetails(this.StaffID).subscribe({
      next: (Response) => {
        if (Response.status == 200) {
          this.EducationDetailList = Response.data;
        }
      },
    });
  }
  onStaffEducationEditClick(value: any): void {
    const selectedRecord = this.EducationDetailList.find((record) => record.sysId === value);
    this.EducationDetailRequest.degreeType = selectedRecord?.degreeType ?? '';
    this.EducationDetailRequest.degree = selectedRecord?.degree ?? '';
    this.EducationDetailRequest.yearOfPassing = selectedRecord?.yearOfPassing.toString() ?? '0';
    this.EducationDetailRequest.universityName = selectedRecord?.universityName ?? '';
    this.EducationDetailRequest.institutionName = selectedRecord?.institutionName ?? '';
    this.EducationDetailRequest.mode = selectedRecord?.mode ?? '';
    this.EducationDetailRequest.passPercentage = selectedRecord?.passPercentage ?? '';
    this.EducationDetailRequest.specialization = selectedRecord?.specialization ?? '';
    this.EducationDetailRequest.sysId = value;
    this.editStaffeducation = true;
  }
  UpdateEducation() {
    this.staffService.UpdateStaffEducationDetails(this.EducationDetailRequest).subscribe({
      next: (Response) => {
        if (Response.status == 200) {
          this.editStaffeducation = false;
          this.clearAddEducation();
          this.GetStaffEducationDetails();
        }
      },
    });
  }
  // #endregion

  // #region Expirence
  AddExpirence() {
    this.staffService.AddExpirence(this.ExperienceDetailRequest).subscribe({
      next: (Response) => {
        if (Response.status == 200) {
          this.resetExperienceForm();
          this.GetStaffExpirence();
        }
      },
    });
  }
  resetExperienceForm() {
    this.ExperienceDetailRequest = new StaffExperienceResponse();
  }
  GetStaffExpirence() {
    this.staffService.GetStaffExpirence(this.StaffID).subscribe({
      next: (Response) => {
        if (Response.status == 200) {
          this.ExperienceDetailList = Response.data;
        }
      },
    });
  }
  onEditExperienceClick(recordId: any): void {
    const selectedRecord = this.ExperienceDetailList.find((record) => record.sysId === recordId);
    if (selectedRecord) {
      this.ExperienceDetailRequest = new StaffExperienceResponse();
    }
    this.editStaffex = true;
  }
  UpdateExpirence() {
    this.staffService.UpdateStaffExpirence(this.ExperienceDetailRequest).subscribe({
      next: (Response) => {
        if (Response.status == 200) {
          this.editStaffex = false;
          this.resetExperienceForm();
          this.GetStaffExpirence();
        }
      },
    });
  }
  // #endregion

  AddDocument() {
    this.staffService.AddDocument(this.DocumentLibraryRequest).subscribe({
      next: (Response) => {
        if (Response.status == 200) {
          this.resetDocumentForm();
          this.GetStaffDocument();
        }
      },
    });
  }
  GetStaffDocument() {
    this.staffService.GetStaffDocument(this.StaffID).subscribe({
      next: (Response) => {
        if (Response.status == 200) {
          this.DocumentLibraryList = Response.data;
        }
      },
    });
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
    this.editStafdoc = true;
    this.cdr.detectChanges();
  }
  resetDocumentForm() {
    this.DocumentLibraryRequest = {
      fileName: '',
      contentType: '',
      data: '',
      fileType: '',
      fkid: this.editId,
    };
  }
  UpdateDocument() {
    this.staffService.UpdateStaffDocument(this.DocumentLibraryRequest).subscribe({
      next: (Response) => {
        if (Response.status == 200) {
          this.editStafdoc = false;
          this.resetDocumentForm();
          this.GetStaffDocument();
        }
      },
    });
  }
  total = 0;
  completed = 0;
  DownloadDocument() {
    this.staffService.ProfileImageList().subscribe({
      next: (Response) => {
        if (Response && Response.data) {
          this.total = Response.data.length;

          // Process items sequentially
          from(Response.data)
            .pipe(
              mergeMap(
                (item: any) => {
                  this.profileguid.guid = item.guid;
                  return this.staffService.ProfileImageByGuid(this.profileguid);
                },
                5, // Limit to 5 concurrent requests
              ),
            )
            .subscribe({
              next: (Response) => {
                this.completed += 1;
                this.fw.SaveIDBWithoutURL(
                  'Image-DB',
                  'ProfileImage',
                  Response.data.guid,
                  Response.data,
                );
              },
              error: (err) => {
                console.error('Error processing document:', err);
              },
              complete: () => {
                console.log('All documents processed successfully!');
              },
            });
        }
      },
      error: (err) => {
        console.error('Error fetching profile image list:', err);
      },
    });
  }
  UpdateStaff() {
    console.log(this.request);
  }
}
