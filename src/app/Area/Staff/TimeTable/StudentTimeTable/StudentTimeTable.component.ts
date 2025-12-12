import { Component, OnInit } from '@angular/core';
import { IapiUrldetails, ICommonFilterRequest } from 'src/app/Modules/Staff/Shared/CommonFilter';
import {
  InsertUpdateTimeSheetRequest,
  TimeSheetRequest,
} from 'src/app/Modules/Staff/TimeTable/TimeTable';
import { FrameworkService } from 'src/app/Shared/framework/framework.service';
import { TimesheetService } from '../timesheet.service';
import { SubjectDetailsResponse } from 'src/app/Modules/Staff/Subject/AddSubject';
import { StaffService } from '../../User/Staff.service';
import { StudentAttendanceConfig } from 'src/app/Modules/CMS/Application Settings/StaffApplicationSettings';
import {
  IHistoryRecordParameter,
  IHistoryRecordSettings,
} from 'src/app/Shared/framework/historyrecord/historyrecord';
import { GlobalService } from 'src/app/Global/Service/global.service';

@Component({
  selector: 'app-StudentTimeTable',
  templateUrl: './StudentTimeTable.component.html',
  styleUrls: ['./StudentTimeTable.component.css'],
  standalone: false,
})
export class StudentTimeTableComponent implements OnInit {
  private readonly HOUR_KEYS = [
    'hour1SubjectSysid',
    'hour2SubjectSysid',
    'hour3SubjectSysid',
    'hour4SubjectSysid',
    'hour5SubjectSysid',
    'hour6SubjectSysid',
  ] as const;
  settingsreq: { application: string } = {
    application: 'StaffApplicationSettings',
  };
  applicationSettings: StudentAttendanceConfig = new StudentAttendanceConfig();
  public apidetails: IapiUrldetails = new IapiUrldetails();
  public filterparameter: ICommonFilterRequest = new ICommonFilterRequest();
  triggercatch: boolean = false;
  public request: TimeSheetRequest = new TimeSheetRequest();
  public tabledata: InsertUpdateTimeSheetRequest[] = [];
  public subjects: SubjectDetailsResponse[] = [];
  attendancehours6: boolean = false;
  saturdayisworkingday: boolean = false;
  showstatus: boolean = false;
  public _historyrecordParameter: IHistoryRecordSettings = new IHistoryRecordSettings();
  showhistory: boolean = false;
  constructor(
    private FS: FrameworkService,
    private _timesheetservice: TimesheetService,
    private _StaffService: StaffService,
    private globalService: GlobalService,
  ) {}

  ngOnInit() {
    this.apidetails.coursetypeapiUrl = '/Course/GetCourseType';
    this.apidetails.batchapiUrl = '/Staff/CIDGetBatchByCourseType';
    this.apidetails.courseapiUrl = '/Staff/CIDGetCourseNameByCourseTypeandBatch';
    this.apidetails.sectionapiUrl = '/Staff/CIDGetSectionListByCourseTypeBatchandCourseCode';
  }
  ngAfterViewInit(): void {
    if (this.FS.CSSE('filter')) {
      this.FS.loadFromSessionStorage('filter', this.filterparameter);
      this.FS.loadFromSessionStorage('filter', this.request);
      this.loadgrid();

      setTimeout(() => {
        this.triggercatch = true;
      }, 100);
    }
  }
  onParameterChange(event: ICommonFilterRequest): void {
    this.request.courseType = event.courseType;
    this.request.batch = event.batch;
    this.request.courseCode = event.courseCode;
    this.request.section = event.section;
    this.showstatus = false;
  }
  loadgrid() {
    if (
      this.request.courseType &&
      this.request.batch &&
      this.request.courseCode &&
      this.request.section &&
      this.request.semester
    ) {
      this._timesheetservice.getSubjectDetails(this.request).subscribe({
        next: (Response) => {
          if (Response.data != null) {
            this.subjects = Response.data;
          } else {
            this.subjects = [];
          }
        },
      });
      this._timesheetservice.getTimesheetDetails(this.request).subscribe({
        next: (Response) => {
          if (Response.data != null) {
            this.tabledata = Response.data;
            this.tabledata.forEach((row) => {
              row.courseCode = this.request.courseCode;
              row.section = this.request.section;
              row.semester = this.request.semester;
              row.courseType = this.request.courseType;
              row.batch = this.request.batch;
            });
            this.attendancehours6 = this.tabledata[0].attendanceHours === 6;
            const rowCount = Response.data.length;
            this.saturdayisworkingday = rowCount > 5;
            this.request.status = this.tabledata[0].status || '';
            this.showstatus = true;
            this.showhistory = true;
          } else {
            this.GetApplicationSettings();
            this.tabledata = [];
            this.showstatus = false;
            this.showhistory = false;
          }
        },
      });
      this.FS.SSSV('filter', this.request);
    }
  }

  private getRow(day: number): DayRow | undefined {
    return this.tabledata.find((x) => x.dayOrder === day);
  }
  getHour(day: number, hour: number): number | null | undefined {
    const row = this.getRow(day);
    if (!row) return null;
    const key = `hour${hour}SubjectSysid` as keyof DayRow;
    return row[key] as number | null | undefined;
  }
  setHour(day: number, hour: number, value: number | null): void {
    const row = this.getRow(day) ?? this.createRow(day);
    const key = this.getHourKey(hour);
    row[key] = value;
  }
  onHistoryClick(day: number, event: Event) {
    const targetElement = event.target as HTMLElement;
    const row = this.getRow(day);
    if (row) {
      this._historyrecordParameter.tableName = 'TimeSheetStudent';
      this._historyrecordParameter.fID = row.sysid || 0; // Ensure Sysid is defined
      this._historyrecordParameter.html = targetElement;
      this.globalService.updateModelHistoryPopup(this._historyrecordParameter);
    }
  }
  private getHourKey(hour: number): (typeof this.HOUR_KEYS)[number] {
    if (hour < 1 || hour > 6) throw new Error('hour must be 1..6');
    return this.HOUR_KEYS[hour - 1];
  }
  /** Create row and assign props one by one (no object spread) */
  private createRow(day: number): InsertUpdateTimeSheetRequest {
    const row = new InsertUpdateTimeSheetRequest(); // all fields defaulted by ctor
    row.courseType = this.request.courseType;
    row.batch = this.request.batch;
    row.courseCode = this.request.courseCode;
    row.section = this.request.section;
    row.semester = this.request.semester;
    row.dayOrder = day;
    // hour1..hour6 remain 0 from constructor until user selects
    this.tabledata.push(row);
    return row;
  }
  public GetApplicationSettings() {
    this._StaffService.getSettings(this.settingsreq).subscribe({
      next: (Response) => {
        if (Response.data != null) {
          this.applicationSettings = StudentAttendanceConfig.fromJson(
            JSON.parse(Response.data.settings),
          );
          this.attendancehours6 = this.applicationSettings.studentAttendanceHours === 6;
          this.saturdayisworkingday = this.applicationSettings.studentAttendanceDay === 6;
        }
      },
    });
  }
  public ChangeStatus() {
    this._timesheetservice.UpdateStatus(this.request).subscribe({
      next: (Response) => {},
    });
  }
}
interface DayRow {
  sysid?: number;
  dayOrder: number;
  hour1SubjectSysid?: number | null;
  hour2SubjectSysid?: number | null;
  hour3SubjectSysid?: number | null;
  hour4SubjectSysid?: number | null;
  hour5SubjectSysid?: number | null;
  hour6SubjectSysid?: number | null;
}
