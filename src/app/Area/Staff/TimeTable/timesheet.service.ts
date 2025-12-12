import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GlobalService } from 'src/app/Global/Service/global.service';
import { TimeSheetRequest } from 'src/app/Modules/Staff/TimeTable/TimeTable';
import { ApiCallService } from 'src/app/Shared/apiCall.service';

@Injectable({
  providedIn: 'root',
})
export class TimesheetService {
  private url = '';
  baseurl: string = '';
  Area: string = 'Staff';
  constructor(
    private http: HttpClient,
    private globalService: GlobalService,
  ) {
    this.baseurl = this.globalService.getAPIBaseUrl();
  }
  getTimesheetDetails(parameter: TimeSheetRequest): Observable<any> {
    this.url = '/TimeSheetStudents/GetTimeTableByClass';
    return ApiCallService.PostwithAuth(
      this.http,
      this.baseurl + this.url,
      parameter,
      this.Area,
      false,
    );
  }
  getSubjectDetails(parameter: TimeSheetRequest): Observable<any> {
    this.url = '/Subject/GetSubjectDetails';
    return ApiCallService.PostwithAuth(
      this.http,
      this.baseurl + this.url,
      parameter,
      this.Area,
      false,
    );
  }
  UpdateStatus(parameter: TimeSheetRequest): Observable<any> {
    return ApiCallService.PostwithAuth(
      this.http,
      this.baseurl + '/TimeSheetStudents/UpdateTimeTableStatus',
      parameter,
      this.Area,
      false,
    );
  }
}
