import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GlobalService } from 'src/app/Global/Service/global.service';
import { ApiCallService } from 'src/app/Shared/apiCall.service';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  private url = '';
  baseurl: string = '';
  Area: string = 'CMS';
  constructor(
    private http: HttpClient,
    private globalService: GlobalService,
  ) {
    this.baseurl = this.globalService.getAPIBaseUrl();
  }
  getSettings(request: any): Observable<any> {
    this.url = '/CMSSettings/GetApplicationDefaultSettings';
    return ApiCallService.PostwithAuth(
      this.http,
      this.baseurl + this.url,
      request,
      this.Area,
      false,
    );
  }
  saveSettings(request: any): Observable<any> {
    this.url = '/CMSSettings/UpdateApplicationSettings';
    return ApiCallService.PostwithAuth(
      this.http,
      this.baseurl + this.url,
      request,
      this.Area,
      false,
    );
  }

  getAdminUser() {
    this.url = '/CMSSettings/GetAdminUsers';
    return ApiCallService.PostwithAuth(this.http, this.baseurl + this.url, {}, this.Area, false);
  }
}
