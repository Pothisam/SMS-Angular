import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GlobalService } from 'src/app/Global/Service/global.service';
import { ApiCallService } from 'src/app/Shared/apiCall.service';

@Injectable({
  providedIn: 'root',
})
export class StaffService {
  private url = '';
  baseurl: string = '';
  Area: string = 'CMS';
  constructor(private http: HttpClient, private globalService: GlobalService) {
    this.baseurl = this.globalService.getAPIBaseUrl();
    this.Area = this.globalService.getArea();
  }
  getIFSCDetails(parameter: any): Observable<any> {
    return ApiCallService.callThirdPartyAPI(this.http, 'IFSC', parameter);
  }
}
