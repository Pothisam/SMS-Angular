import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, of, tap } from 'rxjs';
import { GlobalService } from 'src/app/Global/Service/global.service';
import {
  IChangeInstitutionRequest,
  ILoginRequest,
} from 'src/app/Modules/CMS/User/Request/login.model';
import { ApiCallService } from 'src/app/Shared/apiCall.service';
import { Cmspermission } from './Login/Permission/cmspermission';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  private url = '';
  baseurl: string = '';
  Area: string = 'CMS';
  constructor(
    private http: HttpClient,
    private globalService: GlobalService,
  ) {
    this.baseurl = this.globalService.getAPIBaseUrl();
  }
  private permissions = new BehaviorSubject<any>(new Cmspermission());
  userLogin(LoginRequest: ILoginRequest): Observable<any> {
    this.url = '/CMS/login';
    return ApiCallService.Post(this.http, this.baseurl + this.url, LoginRequest);
  }
  getPermission(): Observable<any> {
    this.url = '/CMSSettings/GetAccessSettings';
    return ApiCallService.PostwithAuth(this.http, this.baseurl + this.url, null, this.Area, true);
  }
  getGroupInstitution(): Observable<any> {
    this.url = '/CMS/GetGroupInstitution';
    return ApiCallService.PostwithAuth(this.http, this.baseurl + this.url, null, this.Area, true);
  }
  ChangeGroupInstitution(request: IChangeInstitutionRequest): Observable<any> {
    this.url = '/CMS/ChangeInstitution';
    return ApiCallService.PostwithAuth(
      this.http,
      this.baseurl + this.url,
      request,
      this.Area,
      false,
    );
  }
  hasPermission(permission: keyof Cmspermission): boolean {
    return this.permissions.value?.[permission] === true;
  }
}
