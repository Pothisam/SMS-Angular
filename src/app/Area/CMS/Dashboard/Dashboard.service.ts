import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GlobalService } from 'src/app/Global/Service/global.service';
import { ApiCallService } from 'src/app/Shared/apiCall.service';
import { ILoginRequest } from 'src/app/Modules/CMS/User/Request/login.model';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private url = '';
  baseurl: string = '';
  Area: string = 'CMS';
  constructor(
    private http: HttpClient,
    private globalService: GlobalService,
  ) {
    this.baseurl = this.globalService.getAPIBaseUrl();
  }
  getDepartmentDetails(): Observable<any> {
    this.url = '/Department/GetActiveDepartmentListDistinct';
    return ApiCallService.PostwithAuth(this.http, this.baseurl + this.url, '', this.Area, true);
  }
  getdashboardList(): Observable<any> {
    this.url = '/Dashboard/CMS/GetCount';
    return ApiCallService.PostwithAuth(this.http, this.baseurl + this.url, '', this.Area, true);
  }
}
