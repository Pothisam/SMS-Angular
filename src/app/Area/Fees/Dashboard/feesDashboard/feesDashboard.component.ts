import { Component, OnInit } from '@angular/core';
import {
  FeesDashboardRequest,
  FeesSummaryClassWiseResponse,
} from 'src/app/Modules/Fees/Dashboard/FeesDashboard';
import { AcademicYearResponse } from 'src/app/Modules/SMS/AcademicYear/AcademicYearResponse';
import { ITableSettings } from 'src/app/Shared/framework/table/table.model';

@Component({
  selector: 'app-feesDashboard',
  templateUrl: './feesDashboard.component.html',
  styleUrls: ['./feesDashboard.component.scss'],
  standalone: false,
})
export class FeesDashboardComponent implements OnInit {
  public request: FeesDashboardRequest = new FeesDashboardRequest();
  public summaryList: FeesSummaryClassWiseResponse[] = [];
  public triggerTableAPI: boolean = false;

  public tableSettings: ITableSettings = {
    showFotter: true,
    showPagination: false,
    jsonData: undefined,
    shorting: true,
    slno: true,
    checkbox: false,
    columns: [
      { title: 'Class Name', data: 'className', short: true, width: 35 },
      { title: 'Fees Amount', data: 'totalFeesAmount', type: 'decimal', width: 20, class: 'text-end', footergroup: [{ sumfunction: true }] },
      { title: 'Fees Amount Received', data: 'feesAmountReceived', type: 'decimal', width: 25, class: 'text-end', footergroup: [{ sumfunction: true }] },
      { title: 'Balance Fees Amount', data: 'feesBalance', type: 'decimal', width: 20, class: 'text-end', footergroup: [{ sumfunction: true }] },
    ],
    columnSticky: [0],
    headerSticky: true,
    filter: false,
  };

  constructor() {}

  ngOnInit(): void {}

  onAcademicYearLoaded(response: AcademicYearResponse[]): void {
    if (!response?.length) return;
    const active = response.find((y) => y.status === 'Active') ?? response[0];
    this.request.academicYearSysId = active.sysId;
    this.triggerTableAPI = true;
  }

  onAcademicYearChange(): void {
    if (this.request.academicYearSysId) {
      this.triggerTableAPI = true;
    }
  }

  onTableResponse(response: any): void {
    this.summaryList = response ?? [];
  }
}
