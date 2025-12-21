import { Component, OnInit } from '@angular/core';
import { ClassSectionRequest } from 'src/app/Modules/SMS/ClassSection/ClassSection.Request';
import { ClassSectionResponse } from 'src/app/Modules/SMS/ClassSection/ClassSection.Response';
import { ITableSettings } from 'src/app/Shared/framework/table/table.model';

@Component({
  selector: 'app-ClassSection',
  templateUrl: './ClassSection.component.html',
  styleUrls: ['./ClassSection.component.scss'],
  standalone: false,
})
export class ClassSectionComponent implements OnInit {
  request: ClassSectionRequest = new ClassSectionRequest();
  sectionlist: ClassSectionResponse[] = [];
  triggerTableAPI: boolean = false;
  public tableSettings: ITableSettings = {
    showFotter: false,
    showPagination: true,
    jsonData: undefined,
    shorting: true,
    slno: true,
    checkbox: false,
    columns: [
      {
        title: 'Class Name',
        data: 'className',
        short: true,
        width: 20,
      },
      { title: 'Section', data: 'sectionName', short: true, width: 10 },
      {
        title: 'Action',
        data: 'Mat-Action',
        width: 20,
        buttongroup: [
          {
            button: true,
            buttondata: 'SysId',
            buttons: ['info', 'history'],
            click: ['history|ClassSection|sysId|'],
          },
        ],
        buttonlabel: 'SysId',
      },
    ],
    columnSticky: [0, 1],
    headerSticky: true,
    filter: false,
  };
  constructor() {}

  ngOnInit() {}
}
