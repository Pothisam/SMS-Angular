import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IndexedDBService } from '../../indexedDB.service';
import { FrameworkService } from '../../framework.service';
import { MatMenuTrigger } from '@angular/material/menu';

@Component({
  selector: 'fw-unarchive',
  templateUrl: './unarchive.component.html',
  styleUrls: ['./unarchive.component.css'],
  standalone: false,
})
export class UnarchiveComponent implements OnInit {
  @ViewChild('menuTrigger') menuTrigger!: MatMenuTrigger;
  _key: string = '';
  _id: number = 0;
  _aria: boolean = false;
  menuItems: any[] = [];
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
    if (!this.append) {
    } else {
      this.GetAppendedvalue();
    }
  }
  onMatIconClick() {
    if (!this.append) {
      this.Getobjvalue();
    } else {
      this.GetAppendedvalue();
      this.menuTrigger.openMenu();
    }
  }
  private Getobjvalue(): void {
    this.idb
      .get('FormDataDB', 'FormData', this._key)
      .then((obj: any) => {
        this._value = obj;
        this.valueChange.emit(this._value);
      })
      .catch((error: any) => {});
  }
  private GetAppendedvalue(): void {
    const storedToken = localStorage.getItem('SMSToken');
    const institutionCode = storedToken ? JSON.parse(storedToken).institutionCode : null;
    this.idb
      .get('FormDataDB', 'FormData', this._key)
      .then((obj: any) => {
        this.menuItems = obj.filter((item: any) => item.institutionCode === institutionCode);
      })
      .catch((error: any) => {});
  }
  onMenuItemClick(item: any): void {
    console.log('Selected Item:', item.value);
    this._value = item.value;
    this.valueChange.emit(this._value);
  }
  onDeleteItem(index: number, event: Event): void {
    event.stopPropagation();
    this.menuItems.splice(index, 1);
    this.idb.saveform('FormDataDB', 'FormData', this._key, this.menuItems);
  }
  ngAfterViewInit(): void {
    this._aria = false;
  }
}
