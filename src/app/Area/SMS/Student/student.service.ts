import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GlobalService } from 'src/app/Global/Service/global.service';
import { IDocumentLibraryAddByFkid } from 'src/app/Modules/Document/documentlibrary';
import { StaffDetailsPKRequest } from 'src/app/Modules/SMS/Staff/StaffRequest';
import {
  StudentDetailRequest,
  StudentSearchRequest,
  StudentShortRequest,
} from 'src/app/Modules/SMS/Student/StudentRequest';
import { ApiCallService } from 'src/app/Shared/apiCall.service';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  private url = '';
  baseurl: string = '';
  Area: string = 'CMS';
  constructor(private http: HttpClient, private globalService: GlobalService) {
    this.baseurl = this.globalService.getAPIBaseUrl();
    this.Area = this.globalService.getArea();
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
  getStudentDetailsSysid(request: StudentDetailRequest): Observable<any> {
    this.url = '/Student/GetStudentDetailBySysid';
    return ApiCallService.PostwithAuth(
      this.http,
      this.baseurl + this.url,
      request,
      this.Area,
      false,
    );
  }
  AddDocument(parameter: IDocumentLibraryAddByFkid): Observable<any> {
    this.url = '/Student/AddStudentDocument';
    return ApiCallService.PostwithAuth(
      this.http,
      this.baseurl + this.url,
      parameter,
      this.Area,
      false,
    );
  }
  GetStudentDocument(parameter: StudentDetailRequest): Observable<any> {
    this.url = '/Student/GetStudentDocument';
    return ApiCallService.PostwithAuth(
      this.http,
      this.baseurl + this.url,
      parameter,
      this.Area,
      false,
    );
  }
}
