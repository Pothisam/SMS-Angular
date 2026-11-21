import { Component, OnInit } from '@angular/core';
import {
  FeesDashboardRequest,
  FeesSummaryClassWiseResponse,
  FeesTypeFilter,
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
  public displayList: FeesSummaryClassWiseResponse[] = [];
  public feesTypes: FeesTypeFilter[] = [];
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

    // Build chips from the distinct fees types, keeping previous on/off choices
    const previous = new Map(this.feesTypes.map((f) => [f.feesTypeId, f.selected]));
    const seen = new Map<number, string>();
    this.summaryList.forEach((r) => {
      if (!seen.has(r.feesTypeId)) seen.set(r.feesTypeId, r.feesDescription);
    });
    this.feesTypes = [...seen.entries()]
      .sort((a, b) => a[0] - b[0])
      .map(([id, desc]) => new FeesTypeFilter(id, desc, previous.get(id) ?? true));

    this.applyFilter();
  }

  toggleFeesType(fee: FeesTypeFilter): void {
    fee.selected = !fee.selected;
    this.applyFilter();
  }

  /** Filter by selected feesTypeId, then sum per class for the table */
  private applyFilter(): void {
    const active = new Set(this.feesTypes.filter((f) => f.selected).map((f) => f.feesTypeId));
    const byClass = new Map<number, FeesSummaryClassWiseResponse>();

    this.summaryList
      .filter((r) => active.has(r.feesTypeId))
      .forEach((r) => {
        const row =
          byClass.get(r.classSysId) ??
          new FeesSummaryClassWiseResponse({ classSysId: r.classSysId, className: r.className });
        row.totalFeesAmount += r.totalFeesAmount;
        row.feesAmountReceived += r.feesAmountReceived;
        row.feesBalance += r.feesBalance;
        byClass.set(r.classSysId, row);
      });

    this.displayList = [...byClass.values()];
  }
}
