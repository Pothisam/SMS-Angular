import { Component, OnInit } from '@angular/core';
import { ISectionRequest } from 'src/app/Modules/CMS/section/Section';
import { IapiUrldetails, ICommonFilterRequest } from 'src/app/Modules/Staff/Shared/CommonFilter';
import {
  AddSubjectRequest,
  SubjectDetailsResponse,
} from 'src/app/Modules/Staff/Subject/AddSubject';
import {
  AddCourseInstructorRequest,
  CourseInstructorResponse,
  UpdateCourseInstructorRequest,
} from 'src/app/Modules/Staff/Subject/CourseInstructor';
import { FrameworkService } from 'src/app/Shared/framework/framework.service';
import { ITableSettings } from 'src/app/Shared/framework/table/table.model';

@Component({
  selector: 'app-AddCourseInstructor',
  templateUrl: './AddCourseInstructor.component.html',
  styleUrls: ['./AddCourseInstructor.component.css'],
  standalone: false,
})
export class AddCourseInstructorComponent implements OnInit {
  public apidetails: IapiUrldetails = new IapiUrldetails();
  public filterparameter: ICommonFilterRequest = new ICommonFilterRequest();
  public request: AddCourseInstructorRequest = new AddCourseInstructorRequest();
  public triggercatch: boolean = false;
  public triggerTableAPI: boolean = false;
  public tableSettings: ITableSettings = {
    showFotter: false,
    showPagination: true,
    jsonData: undefined,
    shorting: true,
    slno: true,
    profileImage: true,
    checkbox: false,
    columns: [
      {
        title: 'Staff Name',
        data: 'staffName',
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
        title: 'Course',
        data: 'courseNameSD',
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
        width: 20,
      },
      {
        title: 'Subject Code',
        data: 'subjectCode',
        short: true,
        width: 10,
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
        width: 15,
        buttongroup: [
          {
            button: true,
            buttondata: 'sysid',
            buttons: ['info', 'toggle', 'history', 'edit'],
            conditions: ['toggle|status|Active'],
            click: ['history|CourseInstructor|sysid|'],
            toggle: [
              'sysid|/CourseInstructor/UpdateCourseInstructorStatus|sysid|Change Status Note: Disabling the course instructor will disable mark entry of this subject.|status,Active,InActive',
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
  public tabledata: CourseInstructorResponse[] = [];
  public subjectdetails: SubjectDetailsResponse[] = [];
  public subjectcode: string = '';
  public subjectcredit: string = '';
  public subjecttype: string = '';
  public marginMark: string = '';
  public editenabled: boolean = false;
  public Staffrequest: ISectionRequest = {
    departmentCode: '',
  };
  triggerstaffapi: boolean = false;
  isdisabled: boolean = false;
  public updateRequest: UpdateCourseInstructorRequest = new UpdateCourseInstructorRequest();
  constructor(private FS: FrameworkService) {}

  ngOnInit() {
    this.apidetails.coursetypeapiUrl = '/Course/GetCourseType';
    this.apidetails.courseapiUrl = '/Staff/HODGetCourseNameByCourseTypeandBatch';
    this.apidetails.batchapiUrl = '/Staff/HODGetBatchByCourseType';
    this.apidetails.sectionapiUrl = '/Staff/HODGetSectionListByCourseTypeBatchandCourseCode';
    this.request.onlyActive = true;
  }
  onParameterChange(event: ICommonFilterRequest): void {
    this.request.courseType = event.courseType;
    this.request.batch = event.batch;
    this.request.courseCode = event.courseCode;
    this.request.section = event.section;
  }
  loadgrid() {
    if (
      this.request.courseType &&
      this.request.batch &&
      this.request.courseCode &&
      this.request.section &&
      this.request.semester
    ) {
      this.triggerTableAPI = true;
      this.FS.SSSV('filter', this.request);
    }
  }
  onSubjectAPIResponse(Response: any) {
    this.subjectdetails = Response;
    this.subjectcode = '';
    this.subjectcredit = '';
    this.subjecttype = '';
    this.marginMark = '';
  }
  onSubjectChanges(value: any) {
    this.request.subjectId = value.value;
    const result = this.subjectdetails.find((subject) => subject.subjectId == value.value);
    this.subjectcode = result ? result.subjectCode : '';
    this.subjectcredit = result ? result.subjectCredit.toString() : '';
    this.subjecttype = result ? result.subjectType : '';
    this.marginMark = result ? result.marginMark.toString() : '';
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
  onAddClick(Response: any) {
    if (Response != null) {
      this.triggerTableAPI = true;
      this.request.subjectId = 0;
      this.Staffrequest.departmentCode = '';
      this.request.staffCode = 0;
    }
  }
  onUpdateClick(Response: any) {
    if (Response != null) {
      this.editenabled = false;
      this.triggerTableAPI = true;
      this.request.subjectId = 0;

      this.Staffrequest.departmentCode = '';
      this.request.staffCode = 0;

      this.isdisabled = false;
    }
  }
  onStaffChanges(value: any) {
    this.updateRequest.staffID = value.value;
  }
  onTableResponse(response: any) {
    if (response != null) {
      this.tabledata = response;
    } else {
      this.tabledata = [];
    }
  }
  onEditClick(value: any): void {
    this.editenabled = true;
    const result = this.tabledata.find((subject) => subject.sysid === value);
    if (result) {
      this.Staffrequest.departmentCode = result.staffDepartmentCode;
      this.request.subjectId = result.subjectId;
      this.request.staffCode = result.staffID;
      this.updateRequest.sysid = result.sysid;
      this.triggerstaffapi = true;

      this.updateRequest.staffID = result.staffID;
    }
    const result2 = this.subjectdetails.find(
      (subject) => subject.subjectId == this.request.subjectId,
    );
    this.subjectcode = result2 ? result2.subjectCode : '';
    this.subjectcredit = result2 ? result2.subjectCredit.toString() : '';
    this.subjecttype = result2 ? result2.subjectType : '';
    this.marginMark = result2 ? result2.marginMark.toString() : '';
    this.isdisabled = true;
  }
  onCancel() {
    this.editenabled = false;
    this.isdisabled = false;
    this.request.subjectId = 0;
    this.Staffrequest.departmentCode = '';
    this.request.staffCode = 0;
  }
}
