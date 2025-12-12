import { Component } from '@angular/core';
import {
  StudentStatusReportRequestModel,
  StudentStatusReportResponseModel,
} from 'src/app/Modules/CMS/Student/Report/StudentStatusReport';
import { ITableSettings } from 'src/app/Shared/framework/table/table.model';
import { StudentService } from '../../Student/student.service';
import { FrameworkService } from 'src/app/Shared/framework/framework.service';

@Component({
  selector: 'app-student-status-report',
  templateUrl: './student-status-report.component.html',
  styleUrl: './student-status-report.component.scss',
  standalone: false,
})
export class StudentStatusReportComponent {
  _loading: boolean = false;
  triggerBatchAPI: boolean = false;
  status: { status: string; text: string }[] = [
    { status: 'Active', text: 'Active' },
    { status: 'InActive', text: 'InActive' },
  ];

  public tableSettings: ITableSettings = {
    showFotter: false,
    showPagination: true,
    jsonData: undefined,
    shorting: true,
    slno: true,
    checkbox: false,
    columns: [
      { title: 'Application No', data: 'applicationNumber', width: 10 },
      { title: 'Admission No', data: 'admissionNumber', width: 10 },
      { title: 'Roll No', data: 'rollNo', width: 10 },
      { title: 'Name', data: 'name', width: 10 },
      { title: 'Course', data: 'courseWithYearAndSection', width: 10 },
      { title: 'Batch', data: 'batch', width: 10 },
      { title: 'Aadhar Card No', data: 'aadharCardNo', width: 10 },
      { title: 'mobileNo', data: 'mobileNo', width: 10 },
      { title: 'Email', data: 'emailId', width: 10 },
      {
        title: 'Action',
        data: 'Mat-Action',
        width: 20,
        buttongroup: [
          {
            button: true,
            buttondata: 'status',
            buttons: ['toggle', 'info'],
            conditions: ['toggle|status|Active'],
            visible: ['toggle|status|InActive'],
            toggle: [
              'sysId|/Student/ActivateStudentById|sysid|Change Status Note: Activate Student Status',
            ],
          },
        ],
        buttonlabel: 'InactiveStudent',
      },
    ],
    columnSticky: [0, 1],
    headerSticky: true,
    filter: false,
  };

  public studentList: StudentStatusReportResponseModel[] = [];

  request: StudentStatusReportRequestModel = new StudentStatusReportRequestModel();

  constructor(
    private studentService: StudentService,
    private fws: FrameworkService,
  ) {}

  ngAfterViewInit() {
    if (this.fws.CSSE('filter')) {
      this.fws.loadFromSessionStorage('filter', this.request);

      if (this.request.courseType !== null) {
        this.triggerBatchAPI = true;
        this.getStudentList();
      }
    }
  }

  onViewStudentList() {
    this.getStudentList();
  }

  async getStudentList(): Promise<void> {
    this._loading = true;
    this.fws.SSSV('filter', this.request);
    this.studentService.getStudentStatusReport(this.request).subscribe({
      next: (Response) => {
        this.studentList = Response.data;
        this._loading = false;
      },
    });
  }
}
