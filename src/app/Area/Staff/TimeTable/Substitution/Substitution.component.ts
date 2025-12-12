import { Component, OnInit } from '@angular/core';
import { IapiUrldetails, ICommonFilterRequest } from 'src/app/Modules/Staff/Shared/CommonFilter';
import {
  InsertSubstitutionRequest,
  TimeSheetSubstitutionResponse,
} from 'src/app/Modules/Staff/TimeTable/Substitution';
import { StaffService } from '../../User/Staff.service';
import { StudentAttendanceConfig } from 'src/app/Modules/CMS/Application Settings/StaffApplicationSettings';
import { ITableSettings } from 'src/app/Shared/framework/table/table.model';
import { ISectionRequest } from 'src/app/Modules/CMS/section/Section';
import { FrameworkService } from 'src/app/Shared/framework/framework.service';

@Component({
  selector: 'app-Substitution',
  templateUrl: './Substitution.component.html',
  styleUrls: ['./Substitution.component.css'],
  standalone: false,
})
export class SubstitutionComponent implements OnInit {
  public apidetails: IapiUrldetails = new IapiUrldetails();
  public filterparameter: ICommonFilterRequest = new ICommonFilterRequest();
  public request: InsertSubstitutionRequest = new InsertSubstitutionRequest();
  triggercatch: boolean = false;
  settingsreq: { application: string } = {
    application: 'StaffApplicationSettings',
  };
  applicationSettings: StudentAttendanceConfig = new StudentAttendanceConfig();
  public hourstring: string = 'Hour I,Hour II,Hour III,Hour IV,Hour V';
  public triggerSubjectAPI: boolean = false;
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
        title: 'Subject Name',
        data: 'subjectName',
        short: true,
        width: 15,
      },
      {
        title: 'Date',
        data: 'attDate',
        short: true,
        width: 15,
        type: 'date',
      },
      {
        title: 'Batch',
        data: 'batch',
        short: true,
        width: 15,
      },
      {
        title: 'Course Name',
        data: 'courseName',
        short: true,
        width: 15,
      },
      {
        title: 'Section',
        data: 'section',
        short: true,
        width: 15,
      },
      {
        title: 'Action',
        data: 'Mat-Action',
        width: 15,
        buttongroup: [
          {
            button: true,
            buttondata: 'sysId',
            buttons: ['info', 'history', 'edit'],
            click: ['history|TimeSheetSubstitution|sysId|'],
          },
        ],
        buttonlabel: 'sysId',
      },
    ],
    columnSticky: [0, 1, 2],
    headerSticky: true,
    filter: true,
  };

  triggerTableAPI: boolean = false;
  Staffdetails: string = '';
  dayorder: string = '';
  SubjectName: string = '';
  editenabled: boolean = false;
  triggerstaffapi: boolean = false;
  public tabledata: TimeSheetSubstitutionResponse[] = [];
  isdisabled: boolean = false;
  constructor(
    private _StaffService: StaffService,
    private FS: FrameworkService,
  ) {
    this.apidetails.coursetypeapiUrl = '/Course/GetCourseType';
    this.apidetails.batchapiUrl = '/Staff/CIDGetBatchByCourseType';
    this.apidetails.courseapiUrl = '/Staff/CIDGetCourseNameByCourseTypeandBatch';
    this.apidetails.sectionapiUrl = '/Staff/CIDGetSectionListByCourseTypeBatchandCourseCode';
    this.GetApplicationSettings();
  }
  public Staffrequest: ISectionRequest = {
    departmentCode: '',
  };
  ngOnInit() {}
  public GetApplicationSettings() {
    this._StaffService.getSettings(this.settingsreq).subscribe({
      next: (Response) => {
        if (Response.data != null) {
          this.applicationSettings = StudentAttendanceConfig.fromJson(
            JSON.parse(Response.data.settings),
          );

          if (this.applicationSettings.studentAttendanceHours === 6) {
            this.hourstring = 'Hour I,Hour II,Hour III,Hour IV,Hour V,Hour VI';
          }
        }
      },
    });
  }
  GetHourData(): void {
    const all = this.request.date && this.request.hour;
    if (all) {
      this._StaffService.getHourDetails(this.request).subscribe({
        next: (Response) => {
          if (Response.data != null) {
            this.dayorder = Response.data.dayName;
            const hourMap: Record<string, number> = {
              'Hour I': 1,
              'Hour II': 2,
              'Hour III': 3,
              'Hour IV': 4,
              'Hour V': 5,
              'Hour VI': 6,
            };
            const hourNum = hourMap[this.request.hour];
            if (!hourNum) {
              console.warn('Invalid hour value:', this.request.hour);
              return;
            }

            const staffKey = `hour${hourNum}StaffName` as keyof typeof Response.data;
            const subjectKey = `hour${hourNum}SubjectName` as keyof typeof Response.data;

            this.Staffdetails = Response.data[staffKey] ?? '';
            this.SubjectName = Response.data[subjectKey] ?? '';
          }
        },
      });
    }
  }
  onSectionChanges() {
    const all =
      this.request.courseType &&
      this.request.batch &&
      this.request.courseCode &&
      this.request.section &&
      this.request.date;
    if (all) {
      this.FS.SSSV('filter', this.request);
      this.triggerTableAPI = true;
    }
    const hd = this.request.date && this.request.hour;
    if (hd) {
      this.GetHourData();
    }
  }
  onDateChange(value: any): void {
    this.request.date = value;
    const all =
      this.request.courseType &&
      this.request.batch &&
      this.request.courseCode &&
      this.request.section &&
      this.request.date;
    if (all) {
      this.triggerTableAPI = true;
      this.FS.SSSV('filter', this.request);
    }
    const hd = this.request.date && this.request.hour;
    if (hd) {
      this.GetHourData();
    }
  }
  onParameterChange(event: ICommonFilterRequest): void {
    this.request.courseType = event.courseType;
    this.request.batch = event.batch;
    this.request.courseCode = event.courseCode;
    this.request.section = event.section;
    const allFilled = !!event.courseType && !!event.batch && !!event.courseCode && !!event.section;
    if (allFilled) {
      this.triggerSubjectAPI = true;
    }
  }
  onAddClick(Response: any) {
    if (Response != null) {
      this.triggerTableAPI = true;
      this.request.subjectCode = 0;
      this.Staffrequest.departmentCode = '';
      this.request.staffCode = 0;
      this.editenabled = false;
    }
  }
  onCancel() {
    this.editenabled = false;
  }
  ngAfterViewInit(): void {
    if (this.FS.CSSE('filter')) {
      this.FS.loadFromSessionStorage('filter', this.filterparameter);
      this.FS.loadFromSessionStorage('filter', this.request);
      this.triggerTableAPI = true;
      this.triggerSubjectAPI = true;

      setTimeout(() => {
        this.triggercatch = true;
      }, 100);
    }
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
    const result = this.tabledata.find((subject) => subject.sysId === value);
    if (result) {
      this.Staffrequest.departmentCode = result.departmentCode;
      this.request.subjectCode = result.subjectId;
      this.request.staffCode = result.staffCode;
      this.request.Sysid = result.sysId;
      this.request.hour = result.attHour;
      this.triggerstaffapi = true;
    }
    this.isdisabled = true;
  }
}
