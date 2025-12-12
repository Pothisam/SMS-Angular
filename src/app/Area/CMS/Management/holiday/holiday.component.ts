import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/Global/Service/global.service';
import { ITableSettings } from 'src/app/Shared/framework/table/table.model';
import { ManagementService } from '../management.service';
import {
  IAddHoliday,
  IHolidayListResponse,
  IHolidayRequest,
} from 'src/app/Modules/CMS/holiday/holiday';

@Component({
  selector: 'app-holiday',
  templateUrl: './holiday.component.html',
  styleUrls: ['./holiday.component.css'],
  standalone: false,
})
export class HolidayComponent implements OnInit {
  dayrquired: boolean = true;
  holidayList: IHolidayListResponse[] = [];
  public ListRequest: IHolidayRequest = {
    year: '',
  };
  public request: IAddHoliday = {
    date: '',
    status: '',
    workingDay: '',
  };
  public reset: IAddHoliday = {
    date: '',
    status: '',
    workingDay: '',
  };
  constructor(
    private globalService: GlobalService,
    private managementService: ManagementService,
  ) {}
  // #region table
  public tableSettings: ITableSettings = {
    showFotter: false,
    showPagination: true,
    jsonData: undefined,
    shorting: true,
    slno: true,
    checkbox: false,
    columns: [
      {
        title: 'month',
        data: 'monthName',
        short: true,
        width: 10,
      },
      {
        title: 'Date',
        data: 'date',
        short: true,
        width: 10,
        render: (row: any) => this.ConvertDate(row, 'date'),
      },
      {
        title: 'Status',
        data: 'status',
        short: true,
        width: 10,
      },
      {
        title: 'Working Day',
        data: 'workingDay',
        short: true,
        width: 10,
      },
      {
        title: 'Action',
        data: 'Mat-Action',
        width: 20,
        buttongroup: [
          {
            button: true,
            buttondata: 'sysid',
            buttons: ['info', 'delete', 'history'],
            conditions: ['delete|recordStatus|Active'],
            click: [
              'history|StudentAttandanceHolidayAndWorkingDay|sysId',
              'delete|sysId|date|/Calendar/DeleteHoliday|fid|Are sure you want to Delete date: <span class="text-danger">{{0}}</span>|Note: Deleting Date Affect Student Attendance Entry|true',
            ],
          },
        ],
        buttonlabel: 'sysid',
      },
    ],
    columnSticky: [0, 1],
    headerSticky: true,
    filter: true,
  };
  ConvertDate(row: any, columnname: string): string {
    return this.globalService.formatDate(row[columnname]);
  }
  // #endregion
  ngOnInit() {
    if (this.globalService.GSSG('Year') != null) {
      this.ListRequest.year = this.globalService.GSSG('Year') ?? '';
    }
  }
  onYearChange(options: { value: string; text: string }) {
    this.ListRequest.year = options.value;
    this.globalService.GSSS('Year', options.value);
    this.getHolidayList();
  }
  onValueChage() {
    this.globalService.GSSS('Year', this.ListRequest.year);
    this.getHolidayList();
  }
  getHolidayList() {
    this.managementService.GetHolidayList(this.ListRequest).subscribe({
      next: (Response) => {
        if (Response.data != null) {
          this.holidayList = Response.data;
        }
      },
    });
  }
  ontypeChanges(options: { value: string; text: string }) {
    this.request.status = options.value;
    if (options.value == 'Holiday') {
      this.request.workingDay = '';
      this.dayrquired = false;
    } else {
      this.dayrquired = true;
    }
  }
  ClearFormAndReload() {
    this.request = { ...this.reset };
    this.getHolidayList();
  }
}
