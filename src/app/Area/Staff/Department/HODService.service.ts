import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GlobalService } from 'src/app/Global/Service/global.service';
import { UpdateTCRequest } from 'src/app/Modules/Staff/Department/IssueTC';
import { ApiCallService } from 'src/app/Shared/apiCall.service';

@Injectable({
  providedIn: 'root',
})
export class HODServiceService {
  private url = '';
  baseurl: string = '';
  Area: string = 'Staff';
  constructor(
    private http: HttpClient,
    private globalService: GlobalService,
  ) {
    this.baseurl = this.globalService.getAPIBaseUrl();
  }
  getStaffInchargeDetails(): Observable<any> {
    this.url = '/StaffIncharge/GetStaffInchargeDetails';
    return ApiCallService.PostwithAuth(this.http, this.baseurl + this.url, null, this.Area, false);
  }
  getUpdateDetails(parameter: UpdateTCRequest): Observable<any> {
    this.url = '/Student/UpdateStudentTCDate';
    return ApiCallService.PostwithAuth(
      this.http,
      this.baseurl + this.url,
      parameter,
      this.Area,
      false,
    );
  }
}
