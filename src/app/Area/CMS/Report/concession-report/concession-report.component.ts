import { Component } from '@angular/core';
import {
  ConcessionReportRequestModel,
  ConcessionReportResponseModel,
} from 'src/app/Modules/CMS/Student/Report/ConcessionReport';
import { StudentService } from '../../Student/student.service';
import { FrameworkService } from 'src/app/Shared/framework/framework.service';
import { ITableSettings } from 'src/app/Shared/framework/table/table.model';

@Component({
  selector: 'app-concession-report',
  standalone: false,
  templateUrl: './concession-report.component.html',
  styleUrl: './concession-report.component.scss',
})
export class ConcessionReportComponent {
  triggerBatchAPI: boolean = false;
  request: ConcessionReportRequestModel = new ConcessionReportRequestModel();
  concessionList: ConcessionReportResponseModel[] = [];

  constructor(
    private studentService: StudentService,
    private fws: FrameworkService,
  ) {}

  ngAfterViewInit() {
    if (this.fws.CSSE('filter')) {
      this.fws.loadFromSessionStorage('filter', this.request);
      if (this.request.courseType !== null) {
        this.triggerBatchAPI = true;
        this.GetConcessionList();
      }
    }
  }

  public tableSettings: ITableSettings = {
    showFotter: false,
    showPagination: true,
    jsonData: undefined,
    shorting: true,
    slno: true,
    checkbox: false,
    columns: [
      { title: 'Roll Number', data: 'rollNo', width: 10 },
      { title: 'Std ID', data: 'studentId', width: 10 },
      { title: 'Name', data: 'name', width: 10 },
      { title: 'Course', data: 'courseWithYearAndSection', width: 10 },
      { title: 'Scholar Ship Type', data: 'scholarshipType', width: 10 },
      { title: 'Depatment Name', data: 'departmentName', width: 10 },
      { title: 'Concession Semester', data: 'semester', width: 10 },
      { title: 'Remark', data: 'remark', width: 10 },
      { title: 'Concession Amount', data: 'concessionAmount', width: 10 },
    ],
    columnSticky: [0, 1],
    headerSticky: true,
    filter: false,
  };

  GetConcessionList() {
    this.fws.SSSV('filter', this.request);
    this.studentService.getConcessionReport(this.request).subscribe({
      next: (Response) => {
        this.concessionList = Response.data;
      },
    });
  }
}
