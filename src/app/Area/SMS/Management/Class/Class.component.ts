import { Component, OnInit } from '@angular/core';
import { AddClassRequest } from 'src/app/Modules/SMS/Class/ClassRequest';
import { ClassResponse } from 'src/app/Modules/SMS/Class/ClassResponse';
import { ITableSettings } from 'src/app/Shared/framework/table/table.model';

@Component({
  selector: 'app-Class',
  templateUrl: './Class.component.html',
  styleUrls: ['./Class.component.scss'],
  standalone: false,
})
export class ClassComponent implements OnInit {
  public request: AddClassRequest = new AddClassRequest();
  public classList: ClassResponse[] = [];
  public triggerTableAPI: boolean = false;
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
        title: 'Class Name',
        data: 'className',
        short: true,
        width: 20,
      },
      {
        title: 'status',
        data: 'status',
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
            buttondata: 'sysId',
            buttons: ['info', 'toggle', 'history'],
            conditions: ['toggle|status|Active'],
            click: ['history|Class|sysId|'],
            toggle: [
              'sysId|/Class/UpdateClassStatus|sysid|Change Status Note: Disabling the class will impact both the section and Student.|status,Active,InActive',
            ],
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

  ngOnInit() {
    this.triggerTableAPI = true;
  }
  onTableResponse(response: any) {
    if (response != null) {
      this.classList = response;
    } else {
      this.classList = [];
    }
  }
  ClearFormAndReload() {
    this.triggerTableAPI = true;
    this.request = new AddClassRequest();
  }
}
