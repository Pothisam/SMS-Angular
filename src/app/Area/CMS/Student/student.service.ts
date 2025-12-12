// #region import
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CommonSemesterYearRequest } from 'src/app/Global/Interface/common-interface';
import { GlobalService } from 'src/app/Global/Service/global.service';
import { StudentStatusReportRequestModel } from 'src/app/Modules/CMS/Student/Report/StudentStatusReport';
import { AdmissionReportRequestModel } from 'src/app/Modules/CMS/Student/Report/AdminssionReport';
import {
  StudentDetailPKRequest,
  StudentSearchRequest,
  StudentShortRequest,
} from 'src/app/Modules/CMS/Student/Student';
import { ApiCallService } from 'src/app/Shared/apiCall.service';
import { ConcessionReportRequestModel } from 'src/app/Modules/CMS/Student/Report/ConcessionReport';
import { IDocumentLibraryAddByfkid } from 'src/app/Modules/Document/documentlibrary';
import { TransferCertificateReportRequestModel } from 'src/app/Modules/CMS/Student/Report/TCReport/TransferCertificateReport';
import { TCReportRequestModel } from 'src/app/Modules/CMS/Student/Report/TCReport/TCPrintReport';
// #endregion

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  private url = '';
  baseurl: string = '';
  Area: string = 'CMS';
  constructor(
    private http: HttpClient,
    private globalService: GlobalService,
  ) {
    this.baseurl = this.globalService.getAPIBaseUrl();
  }
  getSemesterYear(parameter: CommonSemesterYearRequest): Observable<any> {
    this.url = '/Common/GetSemesterYear';
    return ApiCallService.PostwithAuth(
      this.http,
      this.baseurl + this.url,
      parameter,
      this.Area,
      false,
    );
  }
  getStudentCount(): Observable<any> {
    this.url = '/Student/GetStudentCount';
    return ApiCallService.PostwithAuth(this.http, this.baseurl + this.url, null, this.Area, false);
  }
  getStudentList(request: StudentShortRequest): Observable<any> {
    this.url = '/Student/GetStudentDetailsShort';
    return ApiCallService.PostwithAuth(
      this.http,
      this.baseurl + this.url,
      request,
      this.Area,
      false,
    );
  }
  getStudentAC(request: StudentSearchRequest): Observable<any> {
    this.url = '/Student/GetStudentDetailsShortAC';
    return ApiCallService.PostwithAuth(
      this.http,
      this.baseurl + this.url,
      request,
      this.Area,
      false,
    );
  }

  getStudentDetailsSysid(request: StudentDetailPKRequest): Observable<any> {
    this.url = '/Student/GetStudentDetailBySysid';
    return ApiCallService.PostwithAuth(
      this.http,
      this.baseurl + this.url,
      request,
      this.Area,
      false,
    );
  }

  getStudentStatusReport(request: StudentStatusReportRequestModel): Observable<any> {
    this.url = '/Student/GetStudentStatusReport';
    return ApiCallService.PostwithAuth(
      this.http,
      this.baseurl + this.url,
      request,
      this.Area,
      false,
    );
  }

  getAdminssionList(request: AdmissionReportRequestModel): Observable<any> {
    this.url = '/Student/GetAdmissionReport';
    return ApiCallService.PostwithAuth(
      this.http,
      this.baseurl + this.url,
      request,
      this.Area,
      false,
    );
  }

  getConcessionReport(request: ConcessionReportRequestModel): Observable<any> {
    this.url = '/Student/GetConcessionReport';
    return ApiCallService.PostwithAuth(
      this.http,
      this.baseurl + this.url,
      request,
      this.Area,
      false,
    );
  }

  AddDocument(parameter: IDocumentLibraryAddByfkid): Observable<any> {
    this.url = '/Student/AddStudentDocument';
    return ApiCallService.PostwithAuth(
      this.http,
      this.baseurl + this.url,
      parameter,
      this.Area,
      false,
    );
  }
  GetStudentDocument(parameter: StudentDetailPKRequest): Observable<any> {
    this.url = '/Student/GetStudentDocument';
    return ApiCallService.PostwithAuth(
      this.http,
      this.baseurl + this.url,
      parameter,
      this.Area,
      false,
    );
  }

  getScholarShipReportList(request: AdmissionReportRequestModel): Observable<any> {
    this.url = '/Student/GetScholarshipTypeReport';
    return ApiCallService.PostwithAuth(
      this.http,
      this.baseurl + this.url,
      request,
      this.Area,
      false,
    );
  }

  getApplicationList(request: { year: string }): Observable<any> {
    this.url = '/Student/GetCollegeApplicationForm';
    return ApiCallService.PostwithAuth(
      this.http,
      this.baseurl + this.url,
      request,
      this.Area,
      false,
    );
  }

  UpdateStudentRemark(request: any): Observable<any> {
    this.url = '/Student/UpdateApplicationFormRemark';
    return ApiCallService.PostwithAuth(
      this.http,
      this.baseurl + this.url,
      request,
      this.Area,
      false,
    );
  }

  getTCReport(request: TransferCertificateReportRequestModel): Observable<any> {
    this.url = '/Student/GetFeesDefaultersDetails';
    return ApiCallService.PostwithAuth(
      this.http,
      this.baseurl + this.url,
      request,
      this.Area,
      false,
    );
  }

  getTCPrintReport(request: TCReportRequestModel): Observable<any> {
    this.url = '/Student/GetStudentDetailsTC';
    return ApiCallService.PostwithAuth(
      this.http,
      this.baseurl + this.url,
      request,
      this.Area,
      false,
    );
  }
}
