import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { IHistoryRecordParameter, IHistoryRecordSettings } from '../historyrecord';
import { GlobalService } from 'src/app/Global/Service/global.service';
import { FrameworkService } from '../../framework.service';
import { MatTableDataSource } from '@angular/material/table';
interface RecordHistory {
  modifiedBy: string;
  modifiedDate: string;
  data: string;
}

interface Change {
  key: string;
  oldValue: any;
  newValue: any;
}
@Component({
  selector: 'fw-historyrecord',
  templateUrl: './historyrecord.component.html',
  styleUrls: ['./historyrecord.component.css'],
  standalone: false,
})
export class HistoryrecordComponent implements OnInit {
  isModalVisible = true;
  _historySettings: IHistoryRecordSettings = new IHistoryRecordSettings();
  _historyParameter: IHistoryRecordParameter = new IHistoryRecordParameter();
  displayedColumns: string[] = ['key', 'oldValue', 'newValue'];
  area: string = '';

  @ViewChild('recordhistorydrop') modalElement!: ElementRef;
  constructor(
    private globalService: GlobalService,
    private frameworkService: FrameworkService,
  ) {}
  accordionItems: any[] = [];
  ngOnInit() {
    this.globalService.modelhistoryPopup$.subscribe((value: IHistoryRecordSettings) => {
      this._historySettings = value;
      if (this._historySettings.tableName != '') {
        this.CallAPI();
        setTimeout(() => {
          if (this.modalElement) {
            this.modalElement.nativeElement.focus();
          }
        }, 0);
      }
    });
  }

  openModal() {
    this._historySettings.isModalVisible = true;
    if (this.modalElement) {
      this.modalElement.nativeElement.focus();
    }
  }

  closeModal() {
    if (this._historySettings.html != null) {
      this._historySettings.html.focus();
    }
    this._historySettings.isModalVisible = false;
  }
  CallAPI() {
    this.area = this.globalService.getArea();
    this._historyParameter.fID = this._historySettings.fID;
    this._historyParameter.tableName = this._historySettings.tableName;
    this._historyParameter.application = this._historySettings.application;
    this.frameworkService
      .callSelectAPI('/Common/GetRecordHistory', this._historyParameter, this.area, false)
      .subscribe({
        next: (Response) => {
          if (Number(Response.status) === 200 && (!Response.data || Response.data.length !== 0)) {
            this._historySettings.isModalVisible = true;
            this.accordionItems = Response.data.map((item: RecordHistory, index: number) => {
              const parsedData = JSON.parse(item.data);
              const newData = parsedData.New;
              const oldData = parsedData.Old;
              const changes = this.compareHistoryJSON(oldData, newData);

              const dataSource = new MatTableDataSource(changes);

              return {
                index,
                modifiedBy: item.modifiedBy,
                modifiedDate: new Date(item.modifiedDate),
                content: 'Record changes',
                dataSource, // Pass the dataSource for the table
              };
            });
          } else {
          }
        },
      });
  }
  compareHistoryJSON(obj1: any, obj2: any, parentKey: string = ''): Change[] {
    let changes: Change[] = [];
    for (let key in obj1) {
      if (typeof obj1[key] === 'object' && obj1[key] !== null && !(obj1[key] instanceof Array)) {
        changes = [...changes, ...this.compareHistoryJSON(obj1[key], obj2[key] || {}, key)];
      } else if (obj1[key] !== obj2[key]) {
        changes.push({
          key: parentKey ? `${parentKey}.${key}` : key,
          oldValue: obj1[key],
          newValue: obj2[key],
        });
      }
    }
    for (let key in obj2) {
      if (!(key in obj1)) {
        changes.push({
          key: parentKey ? `${parentKey}.${key}` : key,
          oldValue: obj1[key],
          newValue: obj2[key],
        });
      }
    }
    return changes;
  }
}
