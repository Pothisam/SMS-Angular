import { Component, OnInit } from '@angular/core';
import {
  IAddDepartmentRequest,
  IDepartmentResponse,
} from 'src/app/Modules/CMS/department/department';
import { ManagementService } from '../management.service';
import { ITableSettings } from 'src/app/Shared/framework/table/table.model';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css'],
  standalone: false,
})
export class DepartmentComponent implements OnInit {
  departmentcode: string = '';
  public request: IAddDepartmentRequest = {
    departmentname: '',
  };
  departmentList: IDepartmentResponse[] = [];
  public tableSettings: ITableSettings = {
    showFotter: false,
    showPagination: true,
    jsonData: undefined,
    shorting: true,
    slno: true,
    checkbox: false,
    columns: [
      {
        title: 'Department Name',
        data: 'departmentName',
        short: true,
        width: 50,
      },
      { title: 'Department Code', data: 'departmentCode', width: 30 },
      {
        title: 'Action',
        data: 'Mat-Action',
        width: 20,
        buttongroup: [
          {
            button: true,
            buttondata: 'departmentCode',
            buttons: ['delete', 'info'],
            conditions: ['delete|status|Active'],
            click: [
              'delete|sysid|departmentName|/Department/InActivateDepartment|departmentSysid|Are you Sure you want to delete department: <span class="text-danger">{{0}}</span>|Note: Deleting Department Affect Course Section, Student And Staff Details|true',
            ],
          },
        ],
        buttonlabel: 'departmentCode',
      },
    ],
    columnSticky: [0, 1],
    headerSticky: true,
    filter: false,
  };
  constructor(private managementService: ManagementService) {}

  ngOnInit() {
    this.getdepartmentList();
  }
  getdepartmentList() {
    this.managementService.getdepartmentlist().subscribe({
      next: (Response) => {
        if (Response.data != null) {
          this.departmentList = Response.data;
          //this.tableSettings.jsonData = Response.data;
          // this.departments = Response.data.map((item: any) => ({
          //   text: item.departmentName,
          //   value: item.departmentCode,
          // }));
          //this.globalService.CreateOptions("DashboardType","departmentCode","departmentName","status",Response.data)
        }
      },
    });
  }
  onValueChange() {
    if (this.request.departmentname.length == 2) {
      this.GetDepartmentcode();
    }
  }
  GetDepartmentcode() {
    this.managementService.getdepartmentcode(this.request).subscribe({
      next: (Response) => {
        this.departmentcode = Response.data;
      },
    });
  }
  ClearFormAndReload() {
    this.request.departmentname = '';
    this.departmentcode = '';
    this.getdepartmentList();
  }
}
