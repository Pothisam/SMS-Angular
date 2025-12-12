import {
  HttpClient,
  HttpEvent,
  HttpHeaders,
  HttpRequest,
  HttpResponse,
  HttpEventType,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError, shareReplay, of } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { GlobalService } from '../Global/Service/global.service';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root',
})
export class ApiCallService {
  private static cache: { [url: string]: { data: any; expiry: Date } } = {};
  static clearCache() {
    this.cache = {};
  }
  private static getEndOfDay(): Date {
    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);
    return endOfDay;
  }
  constructor(
    private globalService: GlobalService,
    private location: Location,
    private router: Router,
  ) {}
  private static playAudio(type: string): void {
    const audio = new Audio(this.getAudioUrl(type));
    audio.play();
  }
  private static getAudioUrl(type: string): string {
    return window.location.origin + `/assets/Audio/${type === 'D' ? 'sword-sound' : 'Popup'}.mp3`;
  }
  public static ToastTrigger(message: string | undefined, S: string | undefined) {
    if (S?.toString() === '200') {
      this.playAudio('S');
      S = 'bg-success';
    } else if (S?.toString() === 'P') {
      S = 'bg-primary';
    } else if (S?.toString() === '300') {
      S = 'bg-danger';
      this.playAudio('D');
    } else if (S?.toString() === 'W') {
      S = 'bg-warning';
    } else if (S === 'I') {
      var lblToastHeading = document.getElementById('lblToastHeading');
      if (lblToastHeading) {
        lblToastHeading.classList.add('bg-info');
      }
    }

    var ID = 'ToastRandom' + Math.floor(Math.random() * 100000 + 1);
    var ToastBody = this.ToastHtml(S, ID, message);
    var LayoutToastcontainer = document.getElementById('LayoutToastcontainer');
    if (LayoutToastcontainer) {
      LayoutToastcontainer.insertAdjacentHTML('beforeend', ToastBody);
      var toastElement = document.getElementById(ID);
      if (toastElement) {
        toastElement.classList.add('show');
        setTimeout(function () {
          toastElement?.remove();
        }, 5000);
      }
    }
  }
  public static ToastHtml(
    sClass: string | undefined,
    ID: string | undefined,
    Message: string | undefined,
  ): string {
    return (
      '<div class="toast align-items-center text-white ' +
      sClass +
      ' border-0" role="alert" aria-live="assertive" aria-atomic="true" id=' +
      ID +
      '>' +
      '<div class="d-flex"><div class="toast-body"><label>' +
      Message +
      '</label></div>' +
      '<button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button></div>'
    );
  }
  public static Post(http: HttpClient, url: string, parameter: any): Observable<Response> {
    let body = parameter;
    return http.post<Response>(url, body).pipe(
      tap((response: Response) => {
        if (response.message != '' && response.status != '')
          this.ToastTrigger(response.message, response.status);
      }),
    );
  }
  public static PostwithAuth(
    http: HttpClient,
    url: string,
    parameter: any,
    area: string,
    cached: boolean,
  ): Observable<Response> {
    let body = parameter;
    let token = this.GetToken(area);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
    if (this.cache[url] && cached) {
      const cachedData = this.cache[url];
      if (cachedData.expiry > new Date()) {
        return of(cachedData.data); // Return cached data if not expired
      } else {
        delete this.cache[url]; // Clear expired cache
      }
    }
    return http.post<Response>(url, body, { headers }).pipe(
      shareReplay(1),
      tap((response: Response) => {
        if (cached) {
          this.cache[url] = { data: response, expiry: this.getEndOfDay() };
        }
        if (response.message != '' && response.message != null && response.status != '') {
          this.ToastTrigger(response.message, response.status);
        }
      }),
      catchError((error: any) => {
        if (error.status === 401 || error.status === 403) {
          this.RemoveToken(area);
          // Handle unauthorized error, for example, redirect to login page
          //console.log('Unauthorized error occurred:', error);
          // You can also show a toast message or perform any other action
        }
        return throwError(() => error); // Rethrow the error to propagate it
      }),
    );
  }
  public static PostwithoutAuth(
    http: HttpClient,
    url: string,
    parameter: any,
    area: string,
    cached: boolean,
  ): Observable<Response> {
    let body = parameter;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    if (this.cache[url] && cached) {
      const cachedData = this.cache[url];
      if (cachedData.expiry > new Date()) {
        return of(cachedData.data); // Return cached data if not expired
      } else {
        delete this.cache[url]; // Clear expired cache
      }
    }
    return http.post<Response>(url, body, { headers }).pipe(
      shareReplay(1),
      tap((response: Response) => {
        if (cached) {
          this.cache[url] = { data: response, expiry: this.getEndOfDay() };
        }
        if (response.message != '' && response.message != null && response.status != '') {
          this.ToastTrigger(response.message, response.status);
        }
      }),
      catchError((error: any) => {
        if (error.status === 401) {
          this.RemoveToken(area);
          // Handle unauthorized error, for example, redirect to login page
          //console.log('Unauthorized error occurred:', error);
          // You can also show a toast message or perform any other action
        }
        return throwError(() => error); // Rethrow the error to propagate it
      }),
    );
  }
  public static GetToken(area: string): string | null {
    if (area == 'CMS') {
      const Storage = localStorage.getItem('CMSToken');
      if (Storage !== null) {
        // Parse the JSON string to an object
        return JSON.parse(Storage).token;
      }
    }
    if (area == 'Staff') {
      const Storage = localStorage.getItem('StaffToken');
      if (Storage !== null) {
        // Parse the JSON string to an object
        return JSON.parse(Storage).token;
      }
    }
    return null;
  }
  public static RemoveToken(area: string) {
    if (area == 'CMS') {
      localStorage.removeItem('CMSToken');
      window.location.href = '/CMS/Login';
    }
    if (area == 'Staff') {
      localStorage.removeItem('StaffToken');
      window.location.href = '/Staff/Login';
    }
  }
  public static downloadFile(
    http: HttpClient,
    url: string,
    parameter: any,
    area: string,
  ): Observable<HttpResponse<Blob>> {
    let body = parameter;
    let token = this.GetToken(area);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });

    return http.post(url, body, { headers, observe: 'response', responseType: 'json' }).pipe(
      tap((response: any) => {
        // Extract file name from the response headers
        let filename = response.headers.get('fileName') || 'hedernotexists';
        if (filename != 'hedernotexists') {
          if (response.body && response.body.data) {
            // Extract the binary data from the `data` property
            const binaryString = atob(response.body.data);
            const binaryData = new Uint8Array(binaryString.length);

            for (let i = 0; i < binaryString.length; i++) {
              binaryData[i] = binaryString.charCodeAt(i);
            }
            const blob = new Blob([binaryData], {
              type: 'application/octet-stream',
            });

            // Extract file name from the response headers or default to 'downloadedFile'
            let filename = response.headers.get('fileName') || 'downloadedFile';
            // Create a blob URL and download the file
            const blobUrl = URL.createObjectURL(blob);

            const a = document.createElement('a');
            a.href = blobUrl;
            a.download = filename; // Use the extracted file name
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(blobUrl);

            // Trigger your toast message (if needed)
            // this.ToastTrigger('File downloaded successfully', 'success');
          } else {
            this.ToastTrigger('Download error: response body is null', '300');
            console.error();
          }
        } else if (response.body.data.data) {
          const binaryString = atob(response.body.data.data);
          const binaryData = new Uint8Array(binaryString.length);
          for (let i = 0; i < binaryString.length; i++) {
            binaryData[i] = binaryString.charCodeAt(i);
          }
          const blob = new Blob([binaryData], {
            type: 'application/octet-stream',
          });
          let filename = response.body.data.fileName || 'downloadedFile';
          const blobUrl = URL.createObjectURL(blob);

          const a = document.createElement('a');
          a.href = blobUrl;
          a.download = filename; // Use the extracted file name
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          URL.revokeObjectURL(blobUrl);
        }

        // Trigger your toast message (if needed)
        // this.ToastTrigger('File downloaded successfully', 'success');
      }),
      catchError((error: any) => {
        if (error.status === 401) {
          this.RemoveToken(area);
          // Handle unauthorized error, for example, redirect to login page
          // You can also show a toast message or perform any other action
        }
        return throwError(() => error); // Rethrow the error to propagate it
      }),
    );
  }
  public static callThirdPartyAPI(http: HttpClient, type: string, parameter: any): Observable<any> {
    let thirdPartyUrl = '';
    if ((type = 'IFSC')) {
      thirdPartyUrl = `https://ifsc.razorpay.com/${parameter.trim()}`;
    }
    return http.get(thirdPartyUrl).pipe();
  }
  public static postDataWithProgress(
    http: HttpClient,
    url: string,
    parameter: any,
    area: string,
  ): Observable<{ progress: number; response?: any }> {
    const token = this.GetToken(area); // Replace with your token retrieval logic
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });

    const req = new HttpRequest('POST', url, parameter, {
      headers,
      reportProgress: true,
      responseType: 'blob', // Use 'blob' for downloading files
    });

    return http.request(req).pipe(
      map((event: HttpEvent<any>) => {
        switch (event.type) {
          case HttpEventType.DownloadProgress:
            // Handle download progress
            const downloadProgress = event.total
              ? Math.round((100 * event.loaded) / event.total)
              : 0;
            return { progress: downloadProgress };
          case HttpEventType.Response:
            // Handle completed download
            return { progress: 100, response: event.body };
          default:
            return { progress: 0 };
        }
      }),
    );
  }
}
export class Response {
  public message?: string;
  public status?: string;
  public data: any;
}
