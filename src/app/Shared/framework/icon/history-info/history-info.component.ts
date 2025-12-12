import { Component, Input, OnInit } from '@angular/core';
import { IHistoryRecordParameter, IHistoryRecordSettings } from '../../historyrecord/historyrecord';
import { GlobalService } from 'src/app/Global/Service/global.service';

@Component({
  selector: 'fw-history-info',
  templateUrl: './history-info.component.html',
  styleUrls: ['./history-info.component.css'],
  standalone: false,
})
export class HistoryInfoComponent implements OnInit {
  @Input() Parameter: IHistoryRecordParameter = new IHistoryRecordParameter();
  public _historyrecordSettings: IHistoryRecordSettings = new IHistoryRecordSettings();
  constructor(private globalService: GlobalService) {}

  ngOnInit() {}
  onMatIconClick(event: Event) {
    const targetElement = event.target as HTMLElement;
    this._historyrecordSettings.fID = this.Parameter.fID;
    this._historyrecordSettings.tableName = this.Parameter.tableName;
    this._historyrecordSettings.application = this.Parameter.application;
    this._historyrecordSettings.html = targetElement;
    this.globalService.updateModelHistoryPopup(this._historyrecordSettings);
  }
}
