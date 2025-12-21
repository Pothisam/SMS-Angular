import { Component, OnInit } from '@angular/core';
import { AddAcademicYearRequest } from 'src/app/Modules/SMS/AcademicYear/AcademicYearRequest';
import { AcademicYearResponse } from 'src/app/Modules/SMS/AcademicYear/AcademicYearResponse';
import { ITableSettings } from 'src/app/Shared/framework/table/table.model';

@Component({
  selector: 'app-AcademicYear',
  templateUrl: './AcademicYear.component.html',
  styleUrls: ['./AcademicYear.component.scss'],
  standalone: false,
})
export class AcademicYearComponent implements OnInit {
  request: AddAcademicYearRequest = new AddAcademicYearRequest();
  yearList: AcademicYearResponse[] = [];
  triggerTableAPI: boolean = true;
  public tableSettings: ITableSettings = {
    showFotter: false,
    showPagination: true,
    jsonData: undefined,
    shorting: true,
    slno: true,
    profileImage: false,
    checkbox: false,
    columns: [
      {
        title: 'Academic Year',
        data: 'year',
        short: true,
        width: 20,
      },

      {
        title: 'Action',
        data: 'Mat-Action',
        width: 20,
        buttongroup: [
          {
            button: true,
            buttondata: 'sysId',
            buttons: ['info', 'toggle', 'history'],
            conditions: ['toggle|status|Active'],
            click: ['history|AcademicYear|sysId|'],
            toggle: ['sysId|/AcademicYear/UpdateAcademicYearStatus|sysid||'],
          },
        ],
        buttonlabel: 'sysId',
      },
    ],
    columnSticky: [0, 1, 2],
    headerSticky: true,
    filter: true,
  };
  constructor() {}
  onValueChage() {
    if (this.request.yearDate != null) {
      const fromYear = new Date(this.request.yearDate).getFullYear();
      const toYear = new Date(this.request.yearDate).getFullYear() + 1;

      this.request.year = `${fromYear}-${toYear}`;
    } else {
      this.request.year = '';
    }
  }
  ngOnInit() {}
}
