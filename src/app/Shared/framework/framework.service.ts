import { Injectable, Renderer2, RendererFactory2, inject } from '@angular/core';
import { ApiCallService } from '../apiCall.service';
import { GlobalService } from 'src/app/Global/Service/global.service';
import { HttpClient } from '@angular/common/http';
import moment from 'moment';
import { IndexedDBService } from './indexedDB.service';
import { Router } from '@angular/router';
import { firstValueFrom, map, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class FrameworkService {
  private renderer: Renderer2;
  baseurl: string = '';
  constructor(
    private rendererFactory: RendererFactory2,
    private globalService: GlobalService,
    private http: HttpClient,
    private idb: IndexedDBService,
    private router: Router,
  ) {
    this.renderer = rendererFactory.createRenderer(null, null);
    this.baseurl = this.globalService.getAPIBaseUrl();
  }
  initializeEventHandling() {
    // this.renderer.listen('document', 'focusin', this.handleEvent.bind(this));
    // this.renderer.listen('document', 'focusout', this.handleEvent.bind(this));
    // this.renderer.listen('document', 'change', this.handleEvent.bind(this));
    // this.renderer.listen('document', 'click', this.handleEvent.bind(this));
    //this.renderer.listen('document', 'keydown', this.handleEvent.bind(this));
  }
  handleChangeEvent(value: string, id: string) {
    let label = document.getElementById(id)?.parentElement?.querySelector('label');
    if (value !== '' && label != null) {
      label.classList.add('pure-material-textbox-label');
    } else if (label != null) {
      label.classList.remove('pure-material-textbox-label');
    }
  }
  handleSelectChangeEvent(value: string, id: string) {
    let label = document.getElementById(id)?.parentElement?.querySelector('label');
    if (value !== '' && label != null) {
      label.classList.add('pure-material-textbox-label');
    } else if (label != null) {
      label.classList.remove('pure-material-textbox-label');
    }
  }
  handleEyeEvent(event: Event) {
    const target = event.target as HTMLInputElement;
    if (event instanceof KeyboardEvent && event.key != 'Enter') return;
    if (target.classList.contains('pure-material-textbox-password-icon')) {
      if (target.classList.contains('fa-eye')) {
        this.renderer.removeClass(target, 'fa-eye');
        this.renderer.addClass(target, 'fa-eye-slash');
        const inputField = target.parentElement?.querySelector('input');
        if (inputField) {
          this.renderer.setAttribute(inputField, 'type', 'password');
        }
      } else {
        this.renderer.removeClass(target, 'fa-eye-slash');
        this.renderer.addClass(target, 'fa-eye');
        const inputField = target.parentElement?.querySelector('input');
        if (inputField) {
          this.renderer.setAttribute(inputField, 'type', 'text');
        }
      }
    }
  }
  handleEvent(event: Event) {
    const target = event.target as HTMLInputElement;

    if (target.classList.contains('pure-material-textbox-input')) {
      if (target.value === '' || target.value === null) {
        const label = target.parentElement?.querySelector('label.pure-material-textbox-label');
        if (label) {
          this.renderer.removeClass(label, 'pure-material-textbox-label');
        }
      } else {
        const label = target.parentElement?.querySelector('label');
        if (label) {
          this.renderer.addClass(label, 'pure-material-textbox-label');
        }
      }
      if (target.getAttribute('type') === 'password') {
        const icon = target.parentElement?.querySelector('i');
        if (icon) {
          this.renderer.removeAttribute(icon, 'style');
        }
      }
      if (target.getAttribute('type') === 'date' || target.getAttribute('type') === 'month') {
        const label = target.parentElement?.querySelector('label');
        if (label) {
          this.renderer.addClass(label, 'pure-material-textbox-label');
        }
      }
    }

    if (target.classList.contains('pure-material-textbox-password-icon')) {
      if (target.classList.contains('fa-eye')) {
        this.renderer.removeClass(target, 'fa-eye');
        this.renderer.addClass(target, 'fa-eye-slash');
        const inputField = target.parentElement?.querySelector('input');
        if (inputField) {
          this.renderer.setAttribute(inputField, 'type', 'password');
        }
      } else {
        this.renderer.removeClass(target, 'fa-eye-slash');
        this.renderer.addClass(target, 'fa-eye');
        const inputField = target.parentElement?.querySelector('input');
        if (inputField) {
          this.renderer.setAttribute(inputField, 'type', 'text');
        }
      }
    }
  }

  AddEventLiseners(id: string, type: string) {
    const textbox = document.getElementById(id) as HTMLInputElement;
    textbox.addEventListener('keypress', function (event: KeyboardEvent): void {
      if (type == TextboxType.Text) {
        if (!/[a-z\s]/i.test(event.key)) {
          event.preventDefault();
        }
      } else if (type == TextboxType.Number) {
        if (!/[^\d].+/.test(event.key)) {
          if (event.key < '0' || event.key > '9') {
            event.preventDefault();
          }
        }
      }
    });
  }
  callSelectAPI(url: string, parameter: any, area: string, cached: boolean) {
    return ApiCallService.PostwithAuth(this.http, this.baseurl + url, parameter, area, cached);
  }
  callAPIWithNoAuth(url: string, parameter: any, area: string, cached: boolean) {
    return ApiCallService.PostwithoutAuth(this.http, this.baseurl + url, parameter, area, cached);
  }
  callAPI(url: string, parameter: any, area: string, cached: boolean) {
    return ApiCallService.PostwithAuth(this.http, this.baseurl + url, parameter, area, cached);
  }
  callwithNoAuth(url: string, parameter: any, area: string) {
    return ApiCallService.Post(this.http, this.baseurl + url, parameter);
  }
  calldownloadAPI(url: string, parameter: any, area: string) {
    return ApiCallService.downloadFile(this.http, this.baseurl + url, parameter, area);
  }
  toTitleCase(str: string): string {
    return str.toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase());
  }
  dayDiff(fromDate: string | Date, toDate: string | Date): string | null {
    if (fromDate && toDate) {
      const startDate = moment(fromDate);
      const endDate = moment(toDate);

      // Calculate the total difference in days
      const totalDays = endDate.diff(startDate, 'days');
      // Convert the total days into years, months, and days
      const years = Math.floor(totalDays / 365);
      const months = Math.floor((totalDays % 365) / 30);
      const days = (totalDays % 365) % 30;
      const parts: string[] = [];
      if (years > 0) parts.push(`${years} years`);
      if (months > 0) parts.push(`${months} months`);
      if (days > 0 || parts.length === 0) parts.push(`${days} days`); // Include days even if zero if it’s the only part

      // Join the parts with commas
      const formattedDifference = parts.join(', ');

      return formattedDifference;
    }
    return null;
  }
  convertFileToBase64(file: File): Promise<string | ArrayBuffer | null> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file); // This will convert the file to a base64-encoded string
    });
  }
  tosttrigeer(message: string, type: string): void {
    ApiCallService.ToastTrigger(message, type);
  }
  getFileSizeFromBase64(base64String: string): string {
    // Remove the Base64 prefix if present
    const base64Data = base64String.includes(',') ? base64String.split(',')[1] : base64String;

    // Calculate padding (number of '=' characters at the end)
    const padding = base64Data.endsWith('==') ? 2 : base64Data.endsWith('=') ? 1 : 0;

    // Calculate file size in bytes
    const fileSizeInBytes = (base64Data.length * 3) / 4 - padding;

    // Convert bytes to kilobytes and round to 2 decimal places
    return `${(fileSizeInBytes / 1024).toFixed(2)} KB`;
  }
  formatFileSize(fileSizeInKb: number): string {
    const MB = 1024; // 1 MB = 1024 KB
    const GB = 1024 * 1024; // 1 GB = 1024 * 1024 KB

    if (fileSizeInKb < MB) {
      return `${fileSizeInKb.toFixed(2)} KB`;
    } else if (fileSizeInKb < GB) {
      return `${(fileSizeInKb / MB).toFixed(2)} MB`;
    } else {
      return `${(fileSizeInKb / GB).toFixed(2)} GB`;
    }
  }
  SaveIDB(db: string, store: string, key: string, data: any) {
    this.idb.save(db, store, this.router.url + ':' + key, data);
  }
  SaveIDBWithoutURL(db: string, store: string, key: string, data: any) {
    this.idb.save(db, store, key, data);
  }
  getIDB(db: string, store: string, key: string) {
    return this.idb.get(db, store, this.router.url + ':' + key).catch((error: any) => {
      return null; // Handle the error and return a fallback value
    });
  }
  getIDBWithoutURL(db: string, store: string, key: string) {
    return this.idb.get(db, store, key).catch((error: any) => {
      return null; // Handle the error and return a fallback value
    });
  }
  SSGV(key: string) {
    //Session Storage Get Value
    return sessionStorage.getItem(this.router.url + ':' + key);
  }
  SSSV(key: string, value: any) {
    //Session Storage Set Value
    sessionStorage.setItem(this.router.url + ':' + key, JSON.stringify(value));
  }
  SSRI(key: string) {
    //Session Storage Remove Item
    sessionStorage.removeItem(this.router.url + ':' + key);
  }
  CSSE(key: string): boolean {
    //Check Session Storage Exists
    try {
      const value = sessionStorage.getItem(this.router.url + ':' + key);
      return value !== null; // Return true if the key exists, false otherwise
    } catch (error) {
      console.error('sessionStorage is not available:', error);
      return false; // Return false if sessionStorage is not available
    }
  }
  async loadFromSessionStorage<T extends object>(key: string, target: T): Promise<void> {
    try {
      const storedData = sessionStorage.getItem(this.router.url + ':' + key);
      if (storedData) {
        const parsedData = JSON.parse(storedData);
        Object.assign(target, parsedData);
      } else {
        console.log(`No stored data found for key: ${key}`);
      }
    } catch (error) {
      console.error('Error accessing or parsing sessionStorage data:', error);
    }
  }
  formatDateTime(date: string | Date): string {
    if (!date) {
      return ''; // Or handle `undefined` differently, perhaps with a default value or by throwing an error.
    }
    const dateObj = typeof date === 'string' ? new Date(date) : date;

    if (isNaN(dateObj.getTime())) {
      throw new Error('Invalid date'); // Handle invalid date case
    }

    const year = dateObj.getFullYear();
    const month = (dateObj.getMonth() + 1).toString().padStart(2, '0');
    const day = dateObj.getDate().toString().padStart(2, '0');
    const hours = dateObj.getHours().toString().padStart(2, '0');
    const minutes = dateObj.getMinutes().toString().padStart(2, '0');
    const seconds = dateObj.getSeconds().toString().padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }
  formatDate(date: string | Date): string {
    if (!date) {
      return ''; // Or handle `undefined` differently, perhaps with a default value or by throwing an error.
    }
    const dateObj = typeof date === 'string' ? new Date(date) : date;

    if (isNaN(dateObj.getTime())) {
      throw new Error('Invalid date'); // Handle invalid date case
    }

    const year = dateObj.getFullYear();
    const month = (dateObj.getMonth() + 1).toString().padStart(2, '0');
    const day = dateObj.getDate().toString().padStart(2, '0');

    return `${year}-${month}-${day}`;
  }
  async GetCurrentSemester(batch: string, area: string): Promise<string> {
    const response: any = await firstValueFrom(
      ApiCallService.PostwithAuth(
        this.http,
        this.baseurl + '/Batch/GetBatchAndSemester',
        null,
        area,
        true,
      ),
    );
    return response.data.find((b: any) => b.batch === batch)?.semester || '';
  }
}

export enum TextboxType {
  Number = 'NumberOnly',
  Text = 'TextOnly',
  All = 'All',
}
export enum CaseType {
  U = 'UpperCase',
  L = 'LowerCase',
  T = 'TitleCase',
  N = 'NoCase',
}
