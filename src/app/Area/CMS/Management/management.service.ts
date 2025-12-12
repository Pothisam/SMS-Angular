import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GlobalService } from 'src/app/Global/Service/global.service';
import { ISectionRequestList } from 'src/app/Modules/CMS/section/Section';
import { ApiCallService } from 'src/app/Shared/apiCall.service';
@Injectable({
  providedIn: 'root',
})
export class ManagementService {
  private url = '';
  baseurl: string = '';
  Area: string = 'CMS';
  constructor(
    private http: HttpClient,
    private globalService: GlobalService,
  ) {
    this.baseurl = this.globalService.getAPIBaseUrl();
  }
  getdepartmentcode(parameter: any): Observable<any> {
    this.url = '/Department/GetDepartmentCode';
    return ApiCallService.PostwithAuth(
      this.http,
      this.baseurl + this.url,
      parameter,
      this.Area,
      false,
    );
  }
  getdepartmentlist(): Observable<any> {
    this.url = '/Department/GetDepartmentList';
    return ApiCallService.PostwithAuth(this.http, this.baseurl + this.url, '', this.Area, false);
  }
  getcourselist(): Observable<any> {
    this.url = '/Course/GetCourseList';
    return ApiCallService.PostwithAuth(this.http, this.baseurl + this.url, '', this.Area, false);
  }
  getsectionlist(parameter: ISectionRequestList): Observable<any> {
    this.url = '/Section/GetSectionListByCourseCode';
    return ApiCallService.PostwithAuth(
      this.http,
      this.baseurl + this.url,
      parameter,
      this.Area,
      false,
    );
  }
  getbatchlist(): Observable<any> {
    this.url = '/Batch/GetBatchList';
    return ApiCallService.PostwithAuth(this.http, this.baseurl + this.url, '', this.Area, false);
  }
  getSemesterlist(): Observable<any> {
    this.url = '/Common/GetSemesterList';
    return ApiCallService.PostwithAuth(this.http, this.baseurl + this.url, '', this.Area, true);
  }
  updateSemester(parameter: any): Observable<any> {
    this.url = '/Batch/UpdateBatchSemester';
    return ApiCallService.PostwithAuth(
      this.http,
      this.baseurl + this.url,
      parameter,
      this.Area,
      false,
    );
  }
  updateBatchStatus(parameter: any): Observable<any> {
    this.url = '/Batch/UpdateBatchCompletionStatus';
    return ApiCallService.PostwithAuth(
      this.http,
      this.baseurl + this.url,
      parameter,
      this.Area,
      false,
    );
  }
  GetHolidayList(parameter: any): Observable<any> {
    this.url = '/Calendar/GetCalendarList';
    return ApiCallService.PostwithAuth(
      this.http,
      this.baseurl + this.url,
      parameter,
      this.Area,
      false,
    );
  }
}
