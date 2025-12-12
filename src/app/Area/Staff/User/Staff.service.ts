import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GlobalService } from 'src/app/Global/Service/global.service';
import { GetStudentMarkDetailsRequest } from 'src/app/Modules/Staff/Subject/AddStudentMark';
import { ApiCallService } from 'src/app/Shared/apiCall.service';

@Injectable({
  providedIn: 'root',
})
export class StaffService {
  Area: string = 'Staff';
  baseurl: string = '';
  constructor(private http: HttpClient, private globalService: GlobalService) {
    this.baseurl = this.globalService.getAPIBaseUrl();
  }
  getStaffDetails(): Observable<any> {
    return ApiCallService.PostwithAuth(
      this.http,
      this.baseurl + '/Staff/GetLoginStaffDetails',
      null,
      this.Area,
      true,
    );
  }
  getSettings(request: any): Observable<any> {
    return ApiCallService.PostwithAuth(
      this.http,
      this.baseurl + '/CMSSettings/GetApplicationDefaultSettings',
      request,
      this.Area,
      true,
    );
  }
  getHourDetails(request: any): Observable<any> {
    return ApiCallService.PostwithAuth(
      this.http,
      this.baseurl + '/TimeSheetStudents/GetSubstitutionHourDetails',
      request,
      this.Area,
      true,
    );
  }
  getAttendancePrint(request: any): Observable<any> {
    return ApiCallService.PostwithAuth(
      this.http,
      this.baseurl + '/StudentMarkDetails/SubjectMarkReportData',
      request,
      this.Area,
      true,
    );
  }
  getMarkAnalysis1(request: any): Observable<any> {
    return ApiCallService.PostwithAuth(
      this.http,
      this.baseurl + '/CourseInstructor/GetMarkAnalysisSubjectDetailByCode',
      request,
      this.Area,
      false,
    );
  }
  getMarkAnalysis2(request: any): Observable<any> {
    return ApiCallService.PostwithAuth(
      this.http,
      this.baseurl + '/StudentMarkDetails/GetMarkAnalysisSubjectDetail2ByCode',
      request,
      this.Area,
      false,
    );
  }
  getMarkAnalysis3(request: any): Observable<any> {
    return ApiCallService.PostwithAuth(
      this.http,
      this.baseurl + '/StudentMarkDetails/GetMarkAnalysisSubjectDetail3ByCode',
      request,
      this.Area,
      false,
    );
  }
  getCourseDetails(request: any): Observable<any> {
    return ApiCallService.PostwithAuth(
      this.http,
      this.baseurl + '/Course/GetCourseNameDetailsByCourseCode',
      request,
      this.Area,
      false,
    );
  }
}
