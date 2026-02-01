import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalService } from 'src/app/Global/Service/global.service';

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
}
