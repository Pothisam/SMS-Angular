import { Component, OnInit } from '@angular/core';
import {
  FeesDefaultersRequest,
  FeesDefaultersResponse,
} from 'src/app/Modules/Staff/Department/FeesDefaulters';
import { FrameworkService } from 'src/app/Shared/framework/framework.service';
import { ITableSettings } from 'src/app/Shared/framework/table/table.model';

@Component({
  selector: 'app-FeesDefaultersReport',
  templateUrl: './FeesDefaultersReport.component.html',
  styleUrls: ['./FeesDefaultersReport.component.css'],
  standalone: false,
})
export class FeesDefaultersReportComponent implements OnInit {
  triggerbatchapi: boolean = false;
  request: FeesDefaultersRequest = new FeesDefaultersRequest();
  jsondata: FeesDefaultersResponse[] = [];
  triggerbutton: boolean = false;
  public tableSettings: ITableSettings = {
    showFotter: true,
    showPagination: false,
    jsonData: undefined,
    shorting: true,
    slno: true,
    profileImage: true,
    checkbox: false,
    columns: [
      {
        title: 'RollNo',
        data: 'rollNo',
        short: true,
        width: 10,
      },
      {
        title: 'Name',
        data: 'name',
        short: true,
        width: 15,
      },

      {
        title: 'DOB',
        data: 'dob',
        short: true,
        width: 10,
        type: 'date',
      },
      {
        title: 'Course',
        data: 'courseNameSD',
        short: true,
        width: 10,
      },
      {
        title: 'Debit',
        data: 'debit',
        short: true,
        width: 10,
        class: 'text-end',
        footergroup: [{ sumfunction: true }],
        type: 'decimal',
      },
      {
        title: 'Concession',
        data: 'concession',
        short: true,
        width: 10,
        class: 'text-end',
        footergroup: [{ sumfunction: true }],
        type: 'decimal',
      },
      {
        title: 'Credit',
        data: 'credit',
        short: true,
        width: 10,
        class: 'text-end',
        footergroup: [{ sumfunction: true }],
        type: 'decimal',
      },
      {
        title: 'Balance',
        data: 'balance',
        short: true,
        width: 10,
        class: 'text-end',
        footergroup: [{ sumfunction: true }],
        type: 'decimal',
      },
    ],
    columnSticky: [0, 1, 2],
    headerSticky: true,
    filter: true,
    rowCallback: {
      columnname: 'status',
      value: 'Inactive',
      class: 'bg-danger text-white',
    },
  };
  constructor(private frameworkService: FrameworkService) {}
  onBactchChange(options: { value: string; text: string }): void {
    this.request.batch = options.text;
    this.request.semester = options.value;
  }
  ngOnInit() {}
  ngAfterViewInit(): void {
    if (this.frameworkService.CSSE('filter')) {
      this.frameworkService.loadFromSessionStorage('filter', this.request);

      this.triggerbatchapi = true;
      this.triggerbutton = true;
      setTimeout(() => {}, 100);
    }
  }
}
