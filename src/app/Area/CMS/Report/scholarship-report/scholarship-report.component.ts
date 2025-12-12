import { Component } from '@angular/core';
import {
  ScholarShipReportRequestModel,
  ScholarShipReportResponseModel,
} from 'src/app/Modules/CMS/Student/Report/ScholarShipReport';
import { ITableSettings } from 'src/app/Shared/framework/table/table.model';
import { StudentService } from '../../Student/student.service';
import { FrameworkService } from 'src/app/Shared/framework/framework.service';

@Component({
  selector: 'app-scholarship-report',
  standalone: false,
  templateUrl: './scholarship-report.component.html',
  styleUrl: './scholarship-report.component.scss',
})
export class ScholarshipReportComponent {
  request: ScholarShipReportRequestModel = new ScholarShipReportRequestModel();
  triggerBatchAPI: boolean = false;
  ScholarShipReportList: ScholarShipReportResponseModel[] = [];

  public tableSettings: ITableSettings = {
    showFotter: false,
    showPagination: true,
    jsonData: undefined,
    shorting: true,
    slno: true,
    checkbox: false,
    columns: [
      { title: 'Roll Number', data: 'rollNo', width: 10 },
      { title: 'Std Id', data: 'studentId', width: 10 },
      { title: 'Name', data: 'name', width: 10 },
      { title: 'Depatment Name', data: 'departmentName', width: 10 },
      { title: 'Course', data: 'courseWithYearandSection', width: 10 },
      { title: 'ScholarShip Type', data: 'scholarshipType', width: 10 },
      { title: 'Management Scholarship', data: 'managementScholarship', width: 10 },
      { title: 'Charity Scholarship', data: 'charityScholarship', width: 10 },
      { title: 'Charity Amount', data: 'charityAmount', width: 10 },
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
        this.getScholarShipReportList();
      }
    }
  }

  getScholarShipReportList() {
    this.fws.SSSV('filter', this.request);
    this.studentService.getScholarShipReportList(this.request).subscribe({
      next: (Response) => {
        this.ScholarShipReportList = Response.data;
      },
    });
  }
}
