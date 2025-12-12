import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { IndexedDBService } from '../../indexedDB.service';
import { FrameworkService } from '../../framework.service';

@Component({
  selector: 'fw-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.css'],
  standalone: false,
})
export class ArchiveComponent implements OnInit {
  _key: string = '';
  _id: number = 0;
  @Input() key: string = 'default';
  @Input() name: string = 'default';
  @Input() append: boolean = false;
  // #region value
  public _value: any;
  get value() {
    return this._value;
  }
  @Input()
  set value(value: any) {
    if (this._value === value) {
      return;
    }
    this._value = value;
    this.valueChange.emit(this._value);
  }
  @Output()
  valueChange = new EventEmitter<any>();
  // #endregion
  constructor(
    private router: Router,
    private idb: IndexedDBService,
    private frameworkService: FrameworkService,
  ) {}

  ngOnInit() {
    this._key = this.router.url + ':' + this.key;
  }
  onMatIconClick() {
    if (this.append) {
      const storedToken = localStorage.getItem('SMSToken');
      const institutionCode = storedToken ? JSON.parse(storedToken).institutionCode : null;

      const transformedObject = {
        name: this.name,
        id: this.generateRandomKey(),
        date: this.getFormattedDateTime(),
        institutionCode: institutionCode,
        value: this._value,
      };

      this.appendToIndexedDB(this._key, transformedObject);
    } else {
      this.saveToIndexedDB(this._key, this._value);
    }
  }
  private saveToIndexedDB(key: string, value: any): void {
    this.idb.saveform('FormDataDB', 'FormData', key, value);
    this.frameworkService.tosttrigeer('Form data Saved', '200');
  }
  private appendToIndexedDB(key: string, newValue: any): void {
    this.idb
      .get('FormDataDB', 'FormData', key)
      .then((existingValue: any) => {
        // Combine existing value and new value
        const updatedValue = this.getUpdatedValue(existingValue, newValue);

        // Save the updated value back into IndexedDB
        this.idb.saveform('FormDataDB', 'FormData', key, updatedValue);

        this.frameworkService.tosttrigeer('Form data Saved', '200');
      })
      .catch((error: any) => {
        this.saveToIndexedDB(key, newValue);
        this.frameworkService.tosttrigeer('Form data Saved', '200');
      });
  }
  private getUpdatedValue(existingValue: any, newValue: any): any {
    if (Array.isArray(existingValue)) {
      // Append the new object if the existing value is an array
      return [...existingValue, newValue];
    } else if (existingValue) {
      // Wrap the existing value in an array and append the new object
      return [existingValue, newValue];
    } else {
      // Initialize a new array with the new object
      return [newValue];
    }
  }
  private generateRandomKey(): string {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }
  getFormattedDateTime(): string {
    const now = new Date();
    const dd = String(now.getDate()).padStart(2, '0');
    const mm = String(now.getMonth() + 1).padStart(2, '0'); // January is 0!
    const yyyy = now.getFullYear();

    const hh = String(now.getHours()).padStart(2, '0');
    const min = String(now.getMinutes()).padStart(2, '0');
    const ss = String(now.getSeconds()).padStart(2, '0');

    return `${dd}/${mm}/${yyyy} ${hh}:${min}:${ss}`;
  }
}
