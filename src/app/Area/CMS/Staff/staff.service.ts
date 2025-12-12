import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GlobalService } from 'src/app/Global/Service/global.service';
import {
  IEducationAdd,
  IExperienceAdd,
  IStaffSearchRequest,
  StaffDetailsPKRequest,
} from 'src/app/Modules/CMS/Staff/staff';
import {
  IDocumentLibraryAddByfkid,
  IProfileRequest,
} from 'src/app/Modules/Document/documentlibrary';
import { ApiCallService } from 'src/app/Shared/apiCall.service';
import { FrameworkService } from 'src/app/Shared/framework/framework.service';

@Injectable({
  providedIn: 'root',
})
export class StaffService {
  private url = '';
  baseurl: string = '';
  Area: string = 'CMS';
  constructor(
    private http: HttpClient,
    private globalService: GlobalService,
    private frameworkService: FrameworkService,
  ) {
    this.baseurl = this.globalService.getAPIBaseUrl();
  }
  getIFSCDetails(parameter: any): Observable<any> {
    return ApiCallService.callThirdPartyAPI(this.http, 'IFSC', parameter);
  }
  getStaffCount(): Observable<any> {
    this.url = '/Staff/GetStaffCount';
    return ApiCallService.PostwithAuth(this.http, this.baseurl + this.url, '', this.Area, true);
  }
  getStaffList(parameter: IStaffSearchRequest): Observable<any> {
    this.url = '/Staff/GetStaffDetailSearch';
    return ApiCallService.PostwithAuth(
      this.http,
      this.baseurl + this.url,
      parameter,
      this.Area,
      false,
    );
  }
  getStaffDetails(parameter: StaffDetailsPKRequest): Observable<any> {
    this.url = '/Staff/GetStaffDetailByID';
    return ApiCallService.PostwithAuth(
      this.http,
      this.baseurl + this.url,
      parameter,
      this.Area,
      false,
    );
  }
  // #region Staff Language
  AddStaffLanguageDetails(parameter: StaffDetailsPKRequest): Observable<any> {
    this.url = '/Staff/AddStaffLanguage';
    return ApiCallService.PostwithAuth(
      this.http,
      this.baseurl + this.url,
      parameter,
      this.Area,
      false,
    );
  }
  GetStaffLanguageDetails(parameter: StaffDetailsPKRequest): Observable<any> {
    this.url = '/Staff/GetStaffLanguageKnowByID';
    return ApiCallService.PostwithAuth(
      this.http,
      this.baseurl + this.url,
      parameter,
      this.Area,
      false,
    );
  }
  // #endregion

  // #region Add Education
  AddStaffEducationDetails(parameter: IEducationAdd): Observable<any> {
    this.url = '/Staff/AddStaffEducation';
    return ApiCallService.PostwithAuth(
      this.http,
      this.baseurl + this.url,
      parameter,
      this.Area,
      false,
    );
  }
  GetStaffEducationDetails(parameter: StaffDetailsPKRequest): Observable<any> {
    this.url = '/Staff/GetStaffEducationDetailsByID';
    return ApiCallService.PostwithAuth(
      this.http,
      this.baseurl + this.url,
      parameter,
      this.Area,
      false,
    );
  }
  UpdateStaffEducationDetails(parameter: IEducationAdd): Observable<any> {
    this.url = '/Staff/UpdateStaffEducationDetails';
    return ApiCallService.PostwithAuth(
      this.http,
      this.baseurl + this.url,
      parameter,
      this.Area,
      false,
    );
  }
  // #endregion

  // #region Expirence
  AddExpirence(parameter: IExperienceAdd): Observable<any> {
    this.url = '/Staff/AddStaffExperienceDetail';
    return ApiCallService.PostwithAuth(
      this.http,
      this.baseurl + this.url,
      parameter,
      this.Area,
      false,
    );
  }
  GetStaffExpirence(parameter: StaffDetailsPKRequest): Observable<any> {
    this.url = '/Staff/GetStaffExperienceDetailsByID';
    return ApiCallService.PostwithAuth(
      this.http,
      this.baseurl + this.url,
      parameter,
      this.Area,
      false,
    );
  }
  UpdateStaffExpirence(parameter: IExperienceAdd): Observable<any> {
    this.url = '/Staff/UpdateStaffExperienceDetails';
    return ApiCallService.PostwithAuth(
      this.http,
      this.baseurl + this.url,
      parameter,
      this.Area,
      false,
    );
  }
  // #endregion

  AddDocument(parameter: IDocumentLibraryAddByfkid): Observable<any> {
    this.url = '/Staff/AddStaffDocument';
    return ApiCallService.PostwithAuth(
      this.http,
      this.baseurl + this.url,
      parameter,
      this.Area,
      false,
    );
  }
  GetStaffDocument(parameter: StaffDetailsPKRequest): Observable<any> {
    this.url = '/Staff/GetStaffDocument';
    return ApiCallService.PostwithAuth(
      this.http,
      this.baseurl + this.url,
      parameter,
      this.Area,
      false,
    );
  }
  UpdateStaffDocument(parameter: IDocumentLibraryAddByfkid): Observable<any> {
    this.url = '/Staff/UpdateStafffDocument';
    return ApiCallService.PostwithAuth(
      this.http,
      this.baseurl + this.url,
      parameter,
      this.Area,
      false,
    );
  }
  ProfileImageList(): Observable<any> {
    this.url = '/DocumentLibrary/GetAllProfileImage';
    return ApiCallService.PostwithAuth(this.http, this.baseurl + this.url, '', this.Area, false);
  }
  ProfileImageByGuid(parameter: IProfileRequest): Observable<any> {
    this.url = '/DocumentLibrary/GetProfileImagebyGuid';
    return ApiCallService.PostwithAuth(
      this.http,
      this.baseurl + this.url,
      parameter,
      this.Area,
      false,
    );
  }

  GetStaffStatusReport(parameter: object): Observable<any> {
    this.url = '/Staff/GetStaffStatusReport';
    return ApiCallService.PostwithAuth(
      this.http,
      this.baseurl + this.url,
      parameter,
      this.Area,
      false,
    );
  }
}
