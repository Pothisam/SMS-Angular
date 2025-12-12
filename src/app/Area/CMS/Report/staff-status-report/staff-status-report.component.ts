import { Component } from '@angular/core';
import { ITableSettings } from 'src/app/Shared/framework/table/table.model';
import { StaffService } from '../../Staff/staff.service';

@Component({
  selector: 'app-staff-status-report',
  standalone: false,
  templateUrl: './staff-status-report.component.html',
  styleUrl: './staff-status-report.component.scss',
})
export class StaffStatusReportComponent {
  request: { status: string } = { status: 'Active' };

  public StaffStatusList: {
    sysid: number;
    staffID: string;
    name: string;
    departmentName: string;
    designation: string;
    staffType: string;
    status: string;
    addharCardNo: string;
    mobileNo: string;
    emailid: string;
    enteredBy: string | null;
    entrydate: string;
    modifiedBy: string;
    modifiedDate: string;
  }[] = [];

  public tableSettings: ITableSettings = {
    showFotter: false,
    showPagination: true,
    jsonData: undefined,
    shorting: true,
    slno: true,
    checkbox: false,
    columns: [
      { title: 'Name', data: 'name', width: 20 },
      { title: 'Depatment Name', data: 'departmentName', width: 25 },
      { title: 'Designation', data: 'designation', width: 20 },
      { title: 'Staff Type', data: 'staffType', width: 10 },
      { title: 'Mobile No', data: 'mobileNo', width: 10 },
      {
        title: 'Action',
        data: 'Mat-Action',
        width: 10,
        buttongroup: [
          {
            button: true,
            buttondata: 'departmentCode',
            buttons: ['info', 'toggle'],
            conditions: ['toggle|status|Active'],
            visible: ['toggle|status|InActive'],
            toggle: [
              'sysid|/Staff/UpdateStaffStatus|sysid|Change Status Note: Activate Staff Status|status,Active,InActive',
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

  constructor(private StaffService: StaffService) {}

  ngOnInit() {
    this.getStaffStatusReport(false);
  }

  getStaffStatusReport(v: boolean) {
    this.StaffService.GetStaffStatusReport(this.request).subscribe({
      next: (Response) => {
        this.StaffStatusList = Response.data;
      },
    });
  }
}
