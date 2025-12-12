import { Component } from '@angular/core';
import {
  AdmissionReportRequestModel,
  AdmissionReportResponseModel,
} from 'src/app/Modules/CMS/Student/Report/AdminssionReport';
import { ITableSettings } from 'src/app/Shared/framework/table/table.model';
import { StudentService } from '../../Student/student.service';
import { FrameworkService } from 'src/app/Shared/framework/framework.service';

@Component({
  selector: 'app-adminssion-report',
  templateUrl: './adminssion-report.component.html',
  styleUrl: './adminssion-report.component.scss',
  standalone: false,
})
export class AdminssionReportComponent {
  request: AdmissionReportRequestModel = new AdmissionReportRequestModel();

  AdminssionList: AdmissionReportResponseModel[] = [];

  triggerBatchAPI: boolean = false;

  public tableSettings: ITableSettings = {
    showFotter: false,
    showPagination: true,
    jsonData: undefined,
    shorting: true,
    slno: true,
    checkbox: false,
    profileImage: true,
    columns: [
      { title: 'Application Number', data: 'applicationNumber', width: 10 },
      { title: 'Adminssion Number', data: 'admissionNumber', width: 10 },
      { title: 'Roll Number', data: 'rollNo', width: 10 },
      { title: 'Name', data: 'name', width: 10 },
      { title: 'Depatment Name', data: 'departmentName', width: 10 },
      { title: 'Course', data: 'courseWithYearandSection', width: 10 },
      { title: 'Batch', data: 'batch', width: 10 },
      { title: 'Addhar Card Number', data: 'aadharCardNo', width: 10 },
      { title: 'Mobile No', data: 'mobileNo', width: 10 },
      { title: 'Email Id', data: 'emailId', width: 10 },
      {
        title: 'Action',
        data: 'Mat-Action',
        width: 20,
        buttongroup: [
          {
            button: true,
            buttondata: 'departmentCode',
            buttons: ['info'],
          },
        ],
        buttonlabel: 'departmentCode',
      },
    ],
    columnSticky: [0, 1],
    headerSticky: true,
    filter: false,
  };
  constructor(
    private studentService: StudentService,
    private fws: FrameworkService,
  ) {}

  ngAfterViewInit() {
    if (this.fws.CSSE('filter')) {
      this.fws.loadFromSessionStorage('filter', this.request);
      if (this.request.courseType !== null) {
        this.triggerBatchAPI = true;
        this.GetAdminssionList();
      }
    }
  }

  GetAdminssionList() {
    this.fws.SSSV('filter', this.request);
    this.studentService.getAdminssionList(this.request).subscribe({
      next: (Response) => {
        this.AdminssionList = Response.data;
      },
    });
  }
}
