import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GlobalService } from 'src/app/Global/Service/global.service';
import {
  IDocumentLibraryAddByFkid,
  ProfileRequest,
} from 'src/app/Modules/Document/documentlibrary';
import { EducationAdd, StaffDetailsPKRequest } from 'src/app/Modules/SMS/Staff/StaffRequest';
import {
  StaffEducationResponse,
  StaffExperienceResponse,
} from 'src/app/Modules/SMS/Staff/StaffResponse';
import { ApiCallService } from 'src/app/Shared/apiCall.service';

@Injectable({
  providedIn: 'root',
})
export class StaffService {
  private url = '';
  baseurl: string = '';
  Area: string = 'CMS';
  constructor(private http: HttpClient, private globalService: GlobalService) {
    this.baseurl = this.globalService.getAPIBaseUrl();
    this.Area = this.globalService.getArea();
  }
  getIFSCDetails(parameter: any): Observable<any> {
    return ApiCallService.callThirdPartyAPI(this.http, 'IFSC', parameter);
  }
  getStaffCount(): Observable<any> {
    this.url = '/Staff/GetStaffCount';
    return ApiCallService.PostwithAuth(this.http, this.baseurl + this.url, '', this.Area, true);
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
  // #region Add Education
  AddStaffEducationDetails(parameter: StaffEducationResponse): Observable<any> {
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
  UpdateStaffEducationDetails(parameter: StaffEducationResponse): Observable<any> {
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
  AddExpirence(parameter: StaffExperienceResponse): Observable<any> {
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
  UpdateStaffExpirence(parameter: StaffExperienceResponse): Observable<any> {
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
  AddDocument(parameter: IDocumentLibraryAddByFkid): Observable<any> {
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
  UpdateStaffDocument(parameter: IDocumentLibraryAddByFkid): Observable<any> {
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
  ProfileImageByGuid(parameter: ProfileRequest): Observable<any> {
    this.url = '/DocumentLibrary/GetProfileImagebyGuid';
    return ApiCallService.PostwithAuth(
      this.http,
      this.baseurl + this.url,
      parameter,
      this.Area,
      false,
    );
  }
}
