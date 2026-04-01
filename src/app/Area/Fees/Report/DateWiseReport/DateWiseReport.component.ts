import { Component, OnInit } from '@angular/core';
import { FeesReportRequest, FeesReportResponse } from 'src/app/Modules/Fees/Report/DateWiseReport';
import { ITableSettings } from 'src/app/Shared/framework/table/table.model';

@Component({
  selector: 'app-DateWiseReport',
  templateUrl: './DateWiseReport.component.html',
  styleUrls: ['./DateWiseReport.component.scss'],
  standalone: false,
})
export class DateWiseReportComponent implements OnInit {
  public tableSettings: ITableSettings = {
    showFotter: false,
    showPagination: true,
    jsonData: undefined,
    shorting: true,
    slno: true,
    profileImage: false,
    checkbox: false,
    checkboxcondition: { sysId: 'sysid', column: 'status', value: 'Not Generated' },
    columns: [
      {
        title: 'Name',
        data: 'name',
        short: true,
        width: 20,
      },
      {
        title: 'stdid',
        data: 'stdid',
        short: true,
        width: 20,
      },
      {
        title: 'class',
        data: 'className',
        short: true,
        width: 20,
      },
      {
        title: 'section',
        data: 'sectionName',
        short: true,
        width: 20,
      },
      {
        title: 'Acadamic Year',
        data: 'acadamicYear',
        short: true,
        width: 20,
      },
      {
        title: 'Description',
        data: 'description',
        short: true,
        width: 20,
      },
      {
        title: 'Amount',
        data: 'credit',
        short: true,
        width: 20,
        type: 'decimal',
      },

      {
        title: 'Generate Date',
        data: 'generateDate',
        short: true,
        width: 20,
        type: 'date',
      },
      {
        title: 'Action',
        data: 'Mat-Action',
        width: 20,
        buttongroup: [
          {
            button: true,
            buttondata: 'sysId',
            buttons: ['dynamic'],
            dynamic: ['print', 'Print Receipt'],
          },
        ],
        buttonlabel: 'sysId',
      },
    ],
    columnSticky: [0, 1, 2],
    headerSticky: true,
    filter: true,
  };
  public list: FeesReportResponse[] = [];
  public request: FeesReportRequest = new FeesReportRequest();
  public triggerTableAPI = false;
  constructor() {}

  ngOnInit() {}
  onRespons(Response: any) {
    if (Response != null) {
      this.list = Response;
    }
  }
  ondynamicClick(value: any): void {
    const selecteddata = this.list.find((x) => x.sysId == value);

    const jsonValue = JSON.stringify(selecteddata);
    localStorage.setItem('PrintCashReceipt', jsonValue);
    const w = 900,
      h = 700,
      left = (screen.width - w) / 2,
      top = (screen.height - h) / 2;
    window.open(
      `../Fees/PrintCashReceipt`,
      '_blank',
      `width=${w},height=${h},left=${left},top=${top},resizable=yes,scrollbars=yes`,
    );
  }
}
