import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GlobalService } from 'src/app/Global/Service/global.service';
import {
  SessionClass,
  StudentFeesTransactionAddRequest,
  StudentFeesTransactionByNameRequest,
} from 'src/app/Modules/Fees/CollectFees/ViewDetails';
import { UpdateFeesApproveRequest } from 'src/app/Modules/Fees/Managefees/ApproveFees';
import {
  GentrationConcessionRequest,
  GentrationFeesRequest,
  GetConcessionGentrationRequest,
} from 'src/app/Modules/Fees/Managefees/FeesType';
import { ApiCallService } from 'src/app/Shared/apiCall.service';

@Injectable({
  providedIn: 'root',
})
export class FeesService {
  private url = '';
  baseurl: string = '';
  Area: string = 'Fees';
  constructor(
    private http: HttpClient,
    private globalService: GlobalService,
  ) {
    this.baseurl = this.globalService.getAPIBaseUrl();
    this.Area = this.globalService.getArea();
  }
  getStaffDetails(parameter: GentrationFeesRequest): Observable<any> {
    this.url = '/FeesType/InsertStudentFees';
    return ApiCallService.PostwithAuth(
      this.http,
      this.baseurl + this.url,
      parameter,
      this.Area,
      false,
    );
  }
  ApporveFees(parameter: UpdateFeesApproveRequest): Observable<any> {
    this.url = '/FeesType/UpdateFeesApprove';
    return ApiCallService.PostwithAuth(
      this.http,
      this.baseurl + this.url,
      parameter,
      this.Area,
      false,
    );
  }
  GetCollectionFees(parameter: StudentFeesTransactionByNameRequest): Observable<any> {
    this.url = '/StudentFeesTransaction/GetFeesDetailsByName';
    return ApiCallService.PostwithAuth(
      this.http,
      this.baseurl + this.url,
      parameter,
      this.Area,
      false,
    );
  }
  GetStudentdetails(parameter: SessionClass): Observable<any> {
    this.url = '/Student/GetStudentDetailBySysidBatch';
    return ApiCallService.PostwithAuth(
      this.http,
      this.baseurl + this.url,
      parameter,
      this.Area,
      false,
    );
  }
  GetDebitDetails(parameter: SessionClass): Observable<any> {
    this.url = '/StudentFeesTransaction/GetDebit';
    return ApiCallService.PostwithAuth(
      this.http,
      this.baseurl + this.url,
      parameter,
      this.Area,
      false,
    );
  }
  GetCreditDetails(parameter: SessionClass): Observable<any> {
    this.url = '/StudentFeesTransaction/GetCredit';
    return ApiCallService.PostwithAuth(
      this.http,
      this.baseurl + this.url,
      parameter,
      this.Area,
      false,
    );
  }
  AddFees(parameter: StudentFeesTransactionAddRequest): Observable<any> {
    this.url = '/StudentFeesTransaction/AddStudentFeesTransaction';
    return ApiCallService.PostwithAuth(
      this.http,
      this.baseurl + this.url,
      parameter,
      this.Area,
      false,
    );
  }
  CreateConcession(parameter: GentrationConcessionRequest): Observable<any> {
    this.url = '/FeesType/InsertStudentConcession';
    return ApiCallService.PostwithAuth(
      this.http,
      this.baseurl + this.url,
      parameter,
      this.Area,
      false,
    );
  }
}
