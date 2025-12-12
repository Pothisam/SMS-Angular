import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IDocumentLibraryAddByfkid } from 'src/app/Modules/Document/documentlibrary';
import { GlobalService } from './global.service';
import { ApiCallService } from 'src/app/Shared/apiCall.service';

@Injectable({
  providedIn: 'root',
})
export class DocumentService {
  private url = '';
  baseurl: string = '';
  Area: string = '';
  constructor(
    private http: HttpClient,
    private globalService: GlobalService,
  ) {
    this.baseurl = this.globalService.getAPIBaseUrl();
    this.Area = this.globalService.getArea();
  }
  UpdateDocument(parameter: IDocumentLibraryAddByfkid): Observable<any> {
    this.url = '/DocumentLibrary/UpdateDocumentbyFkid';
    return ApiCallService.PostwithAuth(
      this.http,
      this.baseurl + this.url,
      parameter,
      this.Area,
      false,
    );
  }
}
