import { Component, OnInit } from '@angular/core';
import { StudentCountClassWiseResponse } from 'src/app/Modules/SMS/Dashboard/SmsDashboard';
import { ITableSettings } from 'src/app/Shared/framework/table/table.model';

@Component({
  selector: 'app-SmsDashboard',
  templateUrl: './SmsDashboard.component.html',
  styleUrls: ['./SmsDashboard.component.css'],
  standalone: false,
})
export class SmsDashboardComponent implements OnInit {
  public studentCountList: StudentCountClassWiseResponse[] = [];
  public triggerTableAPI: boolean = true;

  public tableSettings: ITableSettings = {
    showFotter: true,
    showPagination: false,
    jsonData: undefined,
    shorting: true,
    slno: true,
    checkbox: false,
    columns: [
      { title: 'Class Name', data: 'className', short: true, width: 70 },
      { title: 'Student Count', data: 'studentCount', width: 30, class: 'text-end', footergroup: [{ sumfunction: true }] },
    ],
    columnSticky: [0],
    headerSticky: true,
    filter: false,
  };

  constructor() {}

  ngOnInit(): void {}

  onTableResponse(response: any): void {
    this.studentCountList = response ?? [];
  }
}
