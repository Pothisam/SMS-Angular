import { Component, OnInit } from '@angular/core';
import { AddFeesTypeRequest, FeesTypeListResponse } from 'src/app/Modules/Fees/Managefees/FeesType';
import { ITableSettings } from 'src/app/Shared/framework/table/table.model';

@Component({
  selector: 'app-AddFeesType',
  templateUrl: './AddFeesType.component.html',
  styleUrls: ['./AddFeesType.component.scss'],
  standalone: false,
})
export class AddFeesTypeComponent implements OnInit {
  public request: AddFeesTypeRequest = new AddFeesTypeRequest();
  public triggerTableAPI: boolean = true;
  public feestypelist: FeesTypeListResponse[] = [];
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
        title: 'Fees Type',
        data: 'feesDescription',
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
            buttondata: 'sysid',
            buttons: ['info', 'toggle', 'history'],
            conditions: ['toggle|status|Active'],
            click: ['history|FeesType|sysid|'],
            toggle: [
              'sysid|/FeesType/DeleteFeesType|sysid|Change Status Note: Disabling the FeesType will impact Student Fees.',
            ],
          },
        ],
        buttonlabel: 'sysid',
      },
    ],
    columnSticky: [0, 1, 2],
    headerSticky: true,
    filter: true,
  };
  constructor() {}

  ngOnInit() {}
  onTableResponse(response: any) {
    if (response != null) {
      this.feestypelist = response;
    } else {
      this.feestypelist = [];
    }
  }
  ClearFormAndReload() {
    this.triggerTableAPI = true;
    this.request = new AddFeesTypeRequest();
  }
}
