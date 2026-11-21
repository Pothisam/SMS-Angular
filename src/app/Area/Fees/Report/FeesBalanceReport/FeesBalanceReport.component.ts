import { Component } from '@angular/core';
import { StudentFeesTransactionRequest } from 'src/app/Modules/Fees/CollectFees/ViewDetails';
import { FeesTypeFilter } from 'src/app/Modules/Fees/Dashboard/FeesDashboard';
import { FeesBalanceReportResponse } from 'src/app/Modules/Fees/Report/FeesBalanceReport';
import { ClassSectionRequest } from 'src/app/Modules/SMS/ClassSection/ClassSection.Request';
import { ITableSettings } from 'src/app/Shared/framework/table/table.model';

@Component({
  selector: 'app-FeesBalanceReport',
  templateUrl: './FeesBalanceReport.component.html',
  styleUrls: ['./FeesBalanceReport.component.scss'],
  standalone: false,
})
export class FeesBalanceReportComponent {
  public request: StudentFeesTransactionRequest = new StudentFeesTransactionRequest();
  public sectionrequest: ClassSectionRequest = new ClassSectionRequest();
  public triggerSectionAPI: boolean = false;

  /** Raw rows (student x fees type) from the API */
  public list: FeesBalanceReportResponse[] = [];
  /** Rows after fees-type filter, summed per student */
  public displayList: FeesBalanceReportResponse[] = [];
  public feesTypes: FeesTypeFilter[] = [];

  public tableSettings: ITableSettings = {
    showFotter: true,
    showPagination: false,
    jsonData: undefined,
    shorting: true,
    slno: true,
    checkbox: false,
    columns: [
      { title: 'Roll No', data: 'rollno', short: true, width: 10 },
      { title: 'Stdid', data: 'stdid', short: true, width: 15 },
      { title: 'Name', data: 'name', short: true, width: 25 },
      { title: 'Class and Section', data: 'className', short: true, width: 15 },
      { title: 'Academic Year', data: 'year', short: true, width: 10 },
      { title: 'Fees Amount', data: 'debit', type: 'decimal', width: 10, class: 'text-end', footergroup: [{ sumfunction: true }] },
      { title: 'Received', data: 'credit', type: 'decimal', width: 10, class: 'text-end', footergroup: [{ sumfunction: true }] },
      { title: 'Balance', data: 'balance', type: 'decimal', width: 10, class: 'text-end', footergroup: [{ sumfunction: true }] },
    ],
    columnSticky: [0, 1, 2],
    headerSticky: true,
    filter: true,
  };

  onClassChange(): void {
    this.sectionrequest.classFkid = this.request.class;
    this.triggerSectionAPI = true;
  }

  onRespons(response: any): void {
    this.list = response ?? [];

    // Build chips from distinct fees types, keeping previous on/off choices
    const previous = new Map(this.feesTypes.map((f) => [f.feesTypeId, f.selected]));
    const seen = new Map<number, string>();
    this.list.forEach((r) => {
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

  /** Filter by selected feesTypeId, then sum per student for the table */
  private applyFilter(): void {
    const active = new Set(this.feesTypes.filter((f) => f.selected).map((f) => f.feesTypeId));
    const byStudent = new Map<number, FeesBalanceReportResponse>();

    this.list
      .filter((r) => active.has(r.feesTypeId))
      .forEach((r) => {
        const row = byStudent.get(r.sysId) ?? new FeesBalanceReportResponse({ ...r, debit: 0, credit: 0, balance: 0 });
        row.debit += r.debit;
        row.credit += r.credit;
        row.balance += r.balance;
        byStudent.set(r.sysId, row);
      });

    this.displayList = [...byStudent.values()];
  }
}
