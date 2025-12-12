import { Component, OnInit } from '@angular/core';
import { IapiUrldetails, ICommonFilterRequest } from 'src/app/Modules/Staff/Shared/CommonFilter';
import {
  AddSubjectRequest,
  SubjectDetailsResponse,
  UpdateSubjectRequest,
} from 'src/app/Modules/Staff/Subject/AddSubject';
import { FrameworkService } from 'src/app/Shared/framework/framework.service';
import { ITableSettings } from 'src/app/Shared/framework/table/table.model';

@Component({
  selector: 'app-AddSubject',
  templateUrl: './AddSubject.component.html',
  styleUrls: ['./AddSubject.component.css'],
  standalone: false,
})
export class AddSubjectComponent implements OnInit {
  public apidetails: IapiUrldetails = new IapiUrldetails();
  public filterparameter: ICommonFilterRequest = new ICommonFilterRequest();
  public request: AddSubjectRequest = new AddSubjectRequest();
  public updateRequest: UpdateSubjectRequest = new UpdateSubjectRequest();
  triggercatch: boolean = false;
  editenabled: boolean = false;
  isdisabled: boolean = false;
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
        title: 'Course Name',
        data: 'courseNameSD',
        short: true,
        width: 20,
      },
      {
        title: 'Batch',
        data: 'batch',
        short: true,
        width: 10,
      },
      {
        title: 'Semester',
        data: 'semester',
        short: true,
        width: 10,
      },
      {
        title: 'Subject Name',
        data: 'subjectName',
        short: true,
        width: 20,
      },
      {
        title: 'Subject Code',
        data: 'subjectCode',
        short: true,
        width: 10,
      },
      {
        title: 'Subject Credit',
        data: 'subjectCredit',
        short: true,
        width: 5,
      },
      {
        title: 'Subject Type',
        data: 'subjectType',
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
            buttondata: 'subjectId',
            buttons: ['info', 'toggle', 'history', 'edit'],
            conditions: ['toggle|status|Active'],
            click: ['history|SubjectDetails|subjectId|'],
            toggle: [
              'subjectId|/Subject/UpdateSubjectStatus|sysid|Change Status Note: Disabling the subject will impact both the course instructor and the student mark screen.|status,Active,InActive',
            ],
          },
        ],
        buttonlabel: 'subjectId',
      },
    ],
    columnSticky: [0, 1, 2],
    headerSticky: true,
    filter: true,
  };
  public tabledata: SubjectDetailsResponse[] = [];
  public triggerTableAPI: boolean = false;
  constructor(private FS: FrameworkService) {}

  ngOnInit() {
    this.apidetails.coursetypeapiUrl = '/Course/GetCourseType';
    this.apidetails.courseapiUrl = '/Staff/HODGetCourseNameByCourseTypeandBatch';
    this.apidetails.batchapiUrl = '/Staff/HODGetBatchByCourseType';
    this.apidetails.sectionapiUrl = '/Staff/HODGetSectionListByCourseTypeBatchandCourseCode';
    this.request.onlyActive = false;
  }
  onParameterChange(event: ICommonFilterRequest): void {
    this.request.courseType = event.courseType;
    this.request.batch = event.batch;
    this.request.courseCode = event.courseCode;
  }
  loadgrid() {
    if (
      this.request.courseType &&
      this.request.batch &&
      this.request.courseCode &&
      this.request.semester
    ) {
      this.triggerTableAPI = true;
      this.FS.SSSV('filter', this.request);
    }
  }
  onRespons(Response: any) {
    if (Response != null) {
      this.triggerTableAPI = true;
      this.request.subjectName = '';
      this.request.subjectCode = '';
      this.request.subjectCredit = 0;
      this.request.subjectType = '';
      this.request.marginMark = 0;
    }
  }
  onUpdateRespons(Response: any) {
    if (Response != null) {
      this.editenabled = false;
      this.updateRequest.subjectName = '';
      this.updateRequest.subjectCode = '';
      this.updateRequest.subjectCredit = 0;
      this.updateRequest.subjectType = '';
      this.updateRequest.marginMark = 0;
      this.triggerTableAPI = true;
      this.isdisabled = false;
    }
  }
  onCancel() {
    this.editenabled = false;
    this.isdisabled = false;
    this.updateRequest.subjectName = '';
    this.updateRequest.subjectCode = '';
    this.updateRequest.subjectCredit = 0;
    this.updateRequest.subjectType = '';
    this.updateRequest.marginMark = 0;
  }
  onTableResponse(response: any) {
    if (response != null) {
      this.tabledata = response;
    } else {
      this.tabledata = [];
    }
  }
  onEditClick(value: any): void {
    this.updateRequest.sysId = value;
    this.editenabled = true;
    const result = this.tabledata.find((subject) => subject.subjectId === value);
    if (result) {
      this.updateRequest.subjectName = result.subjectName;
      this.updateRequest.subjectCode = result.subjectCode;
      this.updateRequest.subjectCredit = result.subjectCredit;
      this.updateRequest.subjectType = result.subjectType;
      this.updateRequest.marginMark = result.marginMark;
    }
    this.isdisabled = true; // Disable the form when editing
  }
  ngAfterViewInit(): void {
    if (this.FS.CSSE('filter')) {
      this.FS.loadFromSessionStorage('filter', this.filterparameter);
      this.FS.loadFromSessionStorage('filter', this.request);
      this.triggerTableAPI = true;

      setTimeout(() => {
        this.triggercatch = true;
      }, 100);
    }
  }
}
