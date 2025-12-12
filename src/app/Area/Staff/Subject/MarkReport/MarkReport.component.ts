import { Component, OnInit } from '@angular/core';
import { IapiUrldetails, ICommonFilterRequest } from 'src/app/Modules/Staff/Shared/CommonFilter';
import { SubjectDetailsResponse } from 'src/app/Modules/Staff/Subject/AddSubject';
import { GetStudentMarkReportRequest } from 'src/app/Modules/Staff/Subject/MarkReport';
import { FrameworkService } from 'src/app/Shared/framework/framework.service';
import { ITableSettings } from 'src/app/Shared/framework/table/table.model';

@Component({
  selector: 'app-MarkReport',
  templateUrl: './MarkReport.component.html',
  styleUrls: ['./MarkReport.component.css'],
  standalone: false,
})
export class MarkReportComponent implements OnInit {
  public apidetails: IapiUrldetails = new IapiUrldetails();
  public filterparameter: ICommonFilterRequest = new ICommonFilterRequest();
  public request: GetStudentMarkReportRequest = new GetStudentMarkReportRequest();
  public subjectdetails: SubjectDetailsResponse[] = [];
  public subjectcode: string = '';
  public subjectcredit: string = '';
  public subjecttype: string = '';
  public marginMark: string = '';
  public triggersubjectAPI: boolean = false;
  triggercatch: boolean = false;
  triggerTableAPI: boolean = false;
  public tableSettings: ITableSettings = {
    showFotter: false,
    showPagination: false,
    jsonData: undefined,
    shorting: true,
    slno: true,
    profileImage: true,
    checkbox: false,
    class: '',
    columns: [
      {
        title: 'Roll No',
        data: 'rollNo',
        short: true,
        width: 10,
      },
      {
        title: 'Name',
        data: 'name',
        short: true,
        width: 15,
      },
      {
        title: 'Batch',
        data: 'batch',
        short: true,
        width: 10,
      },
      {
        title: 'section',
        data: 'section',
        short: true,
        width: 5,
      },
      {
        title: 'Subject Name',
        data: 'subjectName',
        short: true,
        width: 15,
      },
      {
        title: 'Internal I',
        data: 'internalI',
        short: true,
        width: 7,
        class: 'text-end',
        type: 'decimal',
        conditionalClass: [
          { column: 'internalI', operator: '<', value: this.marginMark, cssClass: 'text-danger' },
        ],
      },
      {
        title: 'Internal II',
        data: 'internalII',
        short: true,
        width: 7,
        class: 'text-end',
        type: 'decimal',
      },
      {
        title: 'Model',
        data: 'model',
        short: true,
        width: 7,
        class: 'text-end',
        type: 'decimal',
      },
      {
        title: 'H1',
        data: 'h1Mark',
        short: true,
        width: 7,
        class: 'text-end',
        type: 'decimal',
      },
      {
        title: 'H2',
        data: 'h2Mark',
        short: true,
        width: 7,
        class: 'text-end',
        type: 'decimal',
      },
      {
        title: 'Total',
        data: 'total',
        short: true,
        width: 7,
        class: 'text-end',
        type: 'decimal',
      },
    ],
    columnSticky: [0, 1, 2],
    headerSticky: true,
    filter: true,
  };
  constructor(private FS: FrameworkService) {
    this.apidetails.coursetypeapiUrl = '/Course/GetCourseType';
    this.apidetails.batchapiUrl = '/Staff/CIDGetBatchByCourseType';
    this.apidetails.courseapiUrl = '/Staff/CIDGetCourseNameByCourseTypeandBatch';
    this.apidetails.sectionapiUrl = '/Staff/CIDGetSectionListByCourseTypeBatchandCourseCode';
    this.filterparameter.isActive = true;
  }

  ngOnInit() {}
  ngAfterViewInit() {
    if (this.FS.CSSE('filter')) {
      this.FS.loadFromSessionStorage('filter', this.filterparameter);
      this.FS.loadFromSessionStorage('filter', this.request);

      setTimeout(() => {
        this.triggersubjectAPI = true;
        this.triggercatch = true;
      }, 200);
      setTimeout(() => {
        this.applyThreshold(['internalI', 'internalII', 'model', 'total'], Number(this.marginMark));
        this.triggerTableAPI = true;
      }, 700);
    }
  }
  loadsubject() {
    const hasBaseFields =
      this.request.courseType &&
      this.request.batch &&
      this.request.courseCode &&
      this.request.semester &&
      this.request.section;
    if (hasBaseFields) {
      this.triggersubjectAPI = true;

      if (this.request.subjectId) {
        this.FS.SSSV('filter', this.request);
      }
    }
  }
  loadgrid() {
    this.FS.SSSV('filter', this.request);
    const hasBaseFields =
      this.request.courseType &&
      this.request.batch &&
      this.request.courseCode &&
      this.request.semester &&
      this.request.section &&
      this.request.subjectId;
    if (hasBaseFields) {
      this.applyThreshold(['internalI', 'internalII', 'model', 'total'], Number(this.marginMark));
      // this.tableSettings = structuredClone(this.tableSettings);
      this.triggerTableAPI = true;
    }
  }
  private applyThreshold(keys: string[], threshold: number) {
    this.tableSettings = {
      ...this.tableSettings,
      columns: this.tableSettings.columns.map((c) =>
        keys.includes(c.data)
          ? {
              ...c,
              conditionalClass: [
                { column: c.data, operator: '<', value: threshold, cssClass: 'text-danger' },
              ],
            }
          : { ...c },
      ),
    };
  }

  onSubjectAPIResponse(Response: any) {
    this.subjectdetails = Response;
    this.subjectcode = '';
    this.subjectcredit = '';
    this.subjecttype = '';
    this.marginMark = '';
    if (this.request.subjectId) {
      const result = this.subjectdetails.find(
        (subject) => subject.subjectId == this.request.subjectId,
      );
      this.subjectcode = result ? result.subjectCode : '';
      this.subjectcredit = result ? result.subjectCredit.toString() : '';
      this.subjecttype = result ? result.subjectType : '';
      this.marginMark = result ? result.marginMark.toString() : '';
    }
  }
  onSubjectChanges(value: any) {
    this.request.subjectId = value.value;
    const result = this.subjectdetails.find((subject) => subject.subjectId == value.value);
    this.subjectcode = result ? result.subjectCode : '';
    this.subjectcredit = result ? result.subjectCredit.toString() : '';
    this.subjecttype = result ? result.subjectType : '';
    this.marginMark = result ? result.marginMark.toString() : '';
  }
  onParameterChange(event: ICommonFilterRequest): void {
    this.request.courseType = event.courseType;
    this.request.batch = event.batch;
    this.request.courseCode = event.courseCode;
    this.request.section = event.section;
  }
}
