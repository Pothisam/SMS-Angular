import { Component, OnInit } from '@angular/core';
import {
  IapiUrlAdmindetails,
  IapiUrldetails,
  ICommonFilterAdminRequest,
  ICommonFilterRequest,
} from 'src/app/Modules/Staff/Shared/CommonFilter';
import {
  GetStudentMarkAnalysisRequest,
  StudentMarkAnalysis1Response,
  StudentMarkAnalysis3Response,
  StudentMarkAnalysisResponse,
} from 'src/app/Modules/Staff/Subject/MarkAnalysisReport';
import { FrameworkService } from 'src/app/Shared/framework/framework.service';
import { StaffService } from '../../User/Staff.service';

@Component({
  selector: 'app-MarkAnalysisReport',
  templateUrl: './MarkAnalysisReport.component.html',
  styleUrls: ['./MarkAnalysisReport.component.css'],
  standalone: false,
})
export class MarkAnalysisReportComponent implements OnInit {
  public apidetails: IapiUrldetails = new IapiUrldetails();
  public apidetailsadmin: IapiUrlAdmindetails = new IapiUrlAdmindetails();
  public filterparameter: ICommonFilterRequest = new ICommonFilterRequest();
  public filterparameteradmin: ICommonFilterAdminRequest = new ICommonFilterAdminRequest();
  public request: GetStudentMarkAnalysisRequest = new GetStudentMarkAnalysisRequest();
  public grid1response: StudentMarkAnalysis1Response[] = [];
  public grid2response: StudentMarkAnalysisResponse[] = [];
  public grid3response: StudentMarkAnalysis3Response[] = [];
  _loading: boolean = false;
  triggercatch: boolean = false;
  displayedColumnsgrid1: string[] = [];
  displayedColumnsgrid2: string[] = [];
  displayedColumnsgrid3: string[] = [];
  constructor(private fws: FrameworkService, private staffService: StaffService) {
    this.apidetails.coursetypeapiUrl = '/Course/GetCourseType';
    this.apidetails.batchapiUrl = '/Staff/CIDGetBatchByCourseType';
    this.apidetails.courseapiUrl = '/Staff/CIDGetCourseNameByCourseTypeandBatch';
    this.apidetails.sectionapiUrl = '/Staff/CIDGetSectionListByCourseTypeBatchandCourseCode';
    this.filterparameter.isActive = true;
    this.apidetailsadmin.coursetypeapiUrl = '/Course/GetCourseType';
    this.apidetailsadmin.departmentapiUrl = '/Course/GetDepartmentByCourseType';
    this.apidetailsadmin.batchapiUrl = '/Batch/GetBatchByCourseType';
    this.apidetailsadmin.courseapiUrl = '/Course/GetCourseNameByCourseTypeDepartmentCodeAndBatch';
    this.apidetailsadmin.sectionapiUrl = '/Section/GetSectionByCourseCode';
  }

  ngOnInit() {}
  isRequestValid(): boolean {
    return Object.values(this.request).every((v) => v !== null && v !== undefined && v !== '');
  }
  ngAfterViewInit() {
    if (this.fws.CSSE('filter')) {
      this.fws.loadFromSessionStorage('filter', this.filterparameter);
      this.fws.loadFromSessionStorage('filter', this.request);

      setTimeout(() => {
        this.triggercatch = true;
      }, 200);
    }
  }
  onParameterChange(event: ICommonFilterRequest): void {
    this.request.courseType = event.courseType;
    this.request.batch = event.batch;
    this.request.courseCode = event.courseCode;
    this.request.section = event.section;
  }

  GetGridList() {
    this._loading = true;
    this.fws.SSSV('filter', this.request);
    this.staffService.getMarkAnalysis1(this.request).subscribe({
      next: (Response) => {
        if (Response.data != null) {
          this.grid1response = Response.data;
          this.displayedColumnsgrid1 = ['Id', 'subjectName'];
        }
      },
    });
    this.staffService.getMarkAnalysis2(this.request).subscribe({
      next: (Response) => {
        if (Response.data != null) {
          this.grid2response = Response.data;
          const dynamicCols = this.grid2response[0]?.subjects.map((s: any) => s.column) || [];
          this.displayedColumnsgrid2 = ['Id', 'rollNo', 'name', ...dynamicCols];
        }
      },
    });
    this.staffService.getMarkAnalysis3(this.request).subscribe({
      next: (Response) => {
        if (Response.data != null) {
          this.grid3response = Response.data;
          const dynamicCols = this.grid3response[0]?.subjects.map((s: any) => s.column) || [];
          this.displayedColumnsgrid3 = ['id', 'description', ...dynamicCols];
        }
      },
    });
    this._loading = false;
  }
  columnHeader1Map: { [key: string]: string } = {
    Id: 'ID',
    subjectName: 'Subject Name',
  };
  columnHeader2Map: { [key: string]: string } = {
    Id: 'ID',
    rollNo: 'Roll No',
    name: 'Name',
  };
  columnHeader3Map: { [key: string]: string } = {
    id: 'ID',
    description: 'Description',
  };
  getValuegrid1(row: any, column: string, index?: number): string {
    if (column === 'Id') return (index! + 1).toString();
    if (column === 'subjectName') return row.subjectName;
    return '';
  }
  getValuegrid2(row: any, column: string, index?: number): string {
    if (column === 'Id') return (index! + 1).toString();
    if (column === 'rollNo') return row.rollNo;
    if (column === 'name') return row.name;
    const subject = row.subjects.find((s: any) => s.column === column);
    return subject ? subject.value : '';
  }

  getValuegrid3(row: any, column: string, index?: number): string {
    if (column === 'id') return row.id;
    if (column === 'description') return row.description;
    const subject = row.subjects.find((s: any) => s.column === column);
    return subject ? subject.value : '';
  }
  openPrintPopup() {
    const jsonValue = JSON.stringify(this.request);
    localStorage.setItem('PrintMarkAnalysis', jsonValue);
    const w = 900,
      h = 700,
      left = (screen.width - w) / 2,
      top = (screen.height - h) / 2;
    window.open(
      `/Staff/MarkAnalysisPrint`,
      '_blank',
      `width=${w},height=${h},left=${left},top=${top},resizable=yes,scrollbars=yes`,
    );
  }
}
