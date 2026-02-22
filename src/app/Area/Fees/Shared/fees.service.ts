import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GlobalService } from 'src/app/Global/Service/global.service';
import { GentrationFeesRequest } from 'src/app/Modules/Fees/Managefees/FeesType';
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
}
