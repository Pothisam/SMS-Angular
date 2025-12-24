import { Component, OnInit } from '@angular/core';
import { IDocumentLibraryAdd } from 'src/app/Modules/Document/documentlibrary';
import {
  IEducationDetail,
  IExperienceDetail,
  ILanguageKnown,
  ILanquageKnownRequest,
  IPostoffice,
  IStaffAutocompleteRequest,
  IStaffDetails,
  IStaffRequest,
} from 'src/app/Modules/SMS/Staff/StaffRequest';
import { ITableSettings } from 'src/app/Shared/framework/table/table.model';
import { StaffService } from '../staff.service';
import { FrameworkService } from 'src/app/Shared/framework/framework.service';

@Component({
  selector: 'app-AddStaff',
  templateUrl: './AddStaff.component.html',
  styleUrls: ['./AddStaff.component.scss'],
  standalone: false,
})
export class AddStaffComponent implements OnInit {
  // #region All Table List
  LanguageknownList: ILanguageKnown[] = [];
  ILanquageKnownList: ILanquageKnownRequest[] = [];
  EducationDetailList: IEducationDetail[] = [];
  ExperienceDetailList: IExperienceDetail[] = [];
  DocumentLibraryList: IDocumentLibraryAdd[] = [];
  // #endregion
  AddLanguageError: string = '';
  ifscvalidation: boolean = false;
  age: string = '';
  expirence: string = '';
  agetrigger: boolean = false;
  expirencetrigger: boolean = false;
  public LanguageknowRequest: ILanguageKnown = new ILanguageKnown();
  public EducationDetailRequest: IEducationDetail = new IEducationDetail();

  public ExperienceDetailRequest: IExperienceDetail = new IExperienceDetail();
  public DocumentLibraryRequest: IDocumentLibraryAdd = new IDocumentLibraryAdd();
  public request: IStaffDetails = new IStaffDetails();
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
            buttondata: 'language',
            buttons: ['delete'],
            conditions: ['toggle|status|Active'],
          },
        ],
        buttonlabel: 'language',
      },
    ],
    columnSticky: [0, 1],
    headerSticky: true,
    filter: false,
  };
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
            buttondata: 'degree',
            buttons: ['delete'],
          },
        ],
        buttonlabel: 'degree',
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
      },
      {
        title: 'To',
        data: 'toDate',
        short: true,
        width: 10,
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
  public parmanentpostalrequest: IPostoffice = new IPostoffice();
  parmanentpostaltriggerApi: boolean = false;
  public CommunicationAddressrequest: IPostoffice = new IPostoffice();
  CommunicationpostaltriggerApi: boolean = false;
  constructor(private staffService: StaffService, private fws: FrameworkService) {}
  staffRequest: IStaffRequest = {
    staffDetails: this.request,
    languageRequests: this.ILanquageKnownList,
    educationRequests: this.EducationDetailList,
    experienceRequests: this.ExperienceDetailList,
    documentRequests: this.DocumentLibraryList,
  };
  ngOnInit() {}
  // #region Parmanent Address Change
  onParmanentAddressPincodeChanges() {
    if (this.request.permanentAddressPincode.length == 6) {
      this.parmanentpostalrequest.pincode = this.request.permanentAddressPincode;
      this.parmanentpostaltriggerApi = true;
    }
  }
  onParmanentAddressPostOfficeValueChanges(options: { value: string; text: string }) {
    // Handle the change event here
    this.request.permanentAddressPostOffice = options.value;
  }
  onParmanentAddressPostOfficeAPIResponse(Response: any) {
    if (Response != null) {
      this.request.permanentAddressState = Response[0].stateName;
      this.request.permanentAddressDistrict = Response[0].districtname;
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
      this.request.communicationAddress1 = this.request.permanentAddress1;
      this.request.communicationAddress2 = this.request.permanentAddress2;
      this.request.communicationAddressPincode = this.request.permanentAddressPincode;
      this.CommunicationAddressrequest.pincode = this.request.communicationAddressPincode;
      this.request.communicationAddressPostOffice = this.request.permanentAddressPostOffice;
      this.request.communicationAddressDistrict = this.request.permanentAddressDistrict;
      this.request.communicationAddressState = this.request.permanentAddressState;
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
  // #region Language add remove
  AddLanguage() {
    this.AddLanguageError = '';
    if (
      this.LanguageknowRequest.read ||
      this.LanguageknowRequest.write ||
      this.LanguageknowRequest.speake
    ) {
      // Find the index of the language if it exists
      const existingIndex = this.LanguageknownList.findIndex(
        (item) => item.language.toLowerCase() === this.LanguageknowRequest.language.toLowerCase(),
      );

      if (existingIndex !== -1) {
        // Update the existing language entry
        this.LanguageknownList[existingIndex] = { ...this.LanguageknowRequest };
        this.AddLanguageError = 'Language updated successfully.';
        this.LanguageknownList = [...this.LanguageknownList];
      } else {
        // Add a new language entry if it doesn't exist
        this.LanguageknownList.push({ ...this.LanguageknowRequest });
        this.LanguageknowRequest = new ILanguageKnown();
        this.LanguageknownList = [...this.LanguageknownList];
      }
    } else {
      this.AddLanguageError = 'Please Check Atlest One';
    }
    this.ConvertLanguage();
    this.updateStaffRequest();
  }
  LanguageRemove(remove: any) {
    if (remove != null) {
      this.LanguageknownList = this.LanguageknownList.filter(
        (item) => item.language.toLowerCase() !== remove.language.toLowerCase(),
      );
    }
    this.ConvertLanguage();
    this.updateStaffRequest();
  }
  ConvertLanguage() {
    this.ILanquageKnownList = this.LanguageknownList.map((item) => ({
      language: item.language,
      readLanguage: item.read ? 'Yes' : 'No',
      writeLanguage: item.write ? 'Yes' : 'No',
      speakLanguage: item.speake ? 'Yes' : 'No',
    }));
  }
  ConverttoYesNo(row: any, columnname: string): string {
    return row[columnname] == true ? 'Yes' : 'No';
  }
  // #endregion

  // #region education add and remove
  AddEducation() {
    const existingIndex = this.EducationDetailList.findIndex(
      (item) =>
        item.degree.toLowerCase() === this.EducationDetailRequest.degree.toLowerCase() &&
        item.degreeType.toLowerCase() === this.EducationDetailRequest.degreeType.toLowerCase(),
    );
    if (existingIndex !== -1) {
      // Update the existing language entry
      this.EducationDetailList[existingIndex] = {
        ...this.EducationDetailRequest,
      };
      this.EducationDetailList = [...this.EducationDetailList];
    } else {
      // Add a new language entry if it doesn't exist
      this.EducationDetailList.push({ ...this.EducationDetailRequest });
      this.EducationDetailList = [...this.EducationDetailList];
    }
    this.EducationDetailRequest = {
      degreeType: '',
      degree: '',
      yearOfPassing: '',
      universityName: '',
      institutionName: '',
      mode: '',
      passPercentage: '',
      specialization: '',
    };
    this.updateStaffRequest();
  }
  EducationRemove(remove: any) {
    if (remove != null) {
      this.EducationDetailList = this.EducationDetailList.filter(
        (item) =>
          item.degree.toLowerCase() !== remove.degree.toLowerCase() ||
          item.degreeType.toLowerCase() !== remove.degreeType.toLowerCase(),
      );
    }
    this.updateStaffRequest();
  }
  // #endregion

  // #region Expierence add and remove
  AddExpirence() {
    const existingIndex = this.ExperienceDetailList.findIndex(
      (item) =>
        (item.institutionName ?? '').toLowerCase() ===
          (this.ExperienceDetailRequest.institutionName ?? '').toLowerCase() &&
        (item.position ?? '').toLowerCase() ===
          (this.ExperienceDetailRequest.position ?? '').toLowerCase(),
    );
    if (existingIndex !== -1) {
      // Update the existing language entry
      this.ExperienceDetailList[existingIndex] = {
        ...this.ExperienceDetailRequest,
      };
    } else {
      // Add a new language entry if it doesn't exist
      this.ExperienceDetailList.push({ ...this.ExperienceDetailRequest });
    }
    this.ExperienceDetailList = [...this.ExperienceDetailList];
    this.ExperienceDetailRequest = new IExperienceDetail();
    this.updateStaffRequest();
  }
  GetExpirenece(row: any): string {
    const experience = this.fws.dayDiff(row['fromDate'], row['toDate']);
    return experience !== null ? experience : '';
  }
  ExpireneceRemove(remove: any) {
    if (remove != null) {
      this.ExperienceDetailList = this.ExperienceDetailList.filter(
        (item) =>
          item.institutionName.toLowerCase() !== remove.institutionName.toLowerCase() ||
          item.position.toLowerCase() !== remove.position.toLowerCase(),
      );
    }
    this.updateStaffRequest();
  }
  // #endregion

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
    this.updateStaffRequest();
  }
  GetFileSize(row: any): string {
    return this.fws.getFileSizeFromBase64(row['data']);
  }
  DocumentRemove(remove: any) {
    if (remove != null) {
      this.DocumentLibraryList = this.DocumentLibraryList.filter(
        (item) => item.fileType.toLowerCase() !== remove.fileType.toLowerCase(),
      );
    }
    this.updateStaffRequest();
  }
  // #endregion
  onRespons() {
    this.request = new IStaffDetails();
    this.LanguageknownList = [];
    this.EducationDetailList = [];
    this.ExperienceDetailList = [];
    this.DocumentLibraryList = [];
    this.LanguageknownList = [...this.LanguageknownList];
    this.EducationDetailList = [...this.EducationDetailList];
    this.ExperienceDetailList = [...this.ExperienceDetailList];
    this.DocumentLibraryList = [...this.DocumentLibraryList];
    this.updateStaffRequest();
  }
  updateStaffRequest(): void {
    this.staffRequest = {
      staffDetails: this.request,
      languageRequests: this.ILanquageKnownList,
      educationRequests: this.EducationDetailList,
      experienceRequests: this.ExperienceDetailList,
      documentRequests: this.DocumentLibraryList,
    };
  }
  onChildValueChange(newValue: any): void {
    this.request = newValue.staffDetails;
    this.ILanquageKnownList = newValue.languageRequests;
    this.ReverseConvertLanguage();
    this.EducationDetailList = newValue.educationRequests;
    this.ExperienceDetailList = newValue.experienceRequests;
    this.DocumentLibraryList = newValue.documentRequests;
    this.LanguageknownList = [...this.LanguageknownList];
    this.EducationDetailList = [...this.EducationDetailList];
    this.ExperienceDetailList = [...this.ExperienceDetailList];
    this.DocumentLibraryList = [...this.DocumentLibraryList];
    this.parmanentpostalrequest.pincode = this.request.permanentAddressPincode;
    this.CommunicationAddressrequest.pincode = this.request.communicationAddressPincode;
    this.CommunicationpostaltriggerApi = true;
    this.parmanentpostaltriggerApi = true;
    this.updateStaffRequest();
    this.agetrigger = true;
    this.expirencetrigger = true;
  }
  ReverseConvertLanguage() {
    this.LanguageknownList = this.ILanquageKnownList.map((item) => ({
      language: item.language,
      read: item.readLanguage === 'Yes',
      write: item.writeLanguage === 'Yes',
      speake: item.speakLanguage === 'Yes',
    }));
  }
}
