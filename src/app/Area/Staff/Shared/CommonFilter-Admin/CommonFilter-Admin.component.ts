import { Component, EventEmitter, input, OnInit, Output, effect, signal } from '@angular/core';
import {
  IapiUrlAdmindetails,
  ICommonFilterAdminRequest,
} from 'src/app/Modules/Staff/Shared/CommonFilter';
import { FrameworkService } from 'src/app/Shared/framework/framework.service';

@Component({
  selector: 'app-CommonFilter-Admin',
  templateUrl: './CommonFilter-Admin.component.html',
  styleUrls: ['./CommonFilter-Admin.component.css'],
  standalone: false,
})
export class CommonFilterAdminComponent implements OnInit {
  area = input<string>('Staff');
  triggerCourseTypeAPI: boolean = true;
  triggerDepartmentAPI: boolean = false;
  triggerBatchAPI: boolean = false;
  triggerCourseAPI: boolean = false;
  triggerSectionAPI: boolean = false;
  public _apidetails: IapiUrlAdmindetails = new IapiUrlAdmindetails();
  apiurl = input<IapiUrlAdmindetails>();

  constructor(private FS: FrameworkService) {
    this._apidetails.coursetypeapiUrl = '/Course/GetCourseType';
    this._apidetails.departmentapiUrl = '/Course/GetDepartmentByCourseType';
    this._apidetails.batchapiUrl = '/Batch/GetBatchByCourseType';
    this._apidetails.courseapiUrl = '/Course/GetCourseNameByCourseTypeDepartmentCodeAndBatch';
    this._apidetails.sectionapiUrl = '/Section/GetSectionByCourseCode';
    // this.apiurl?.batchapiUrl =

    // Effect to handle apiurl changes
    effect(() => {
      const value = this.apiurl();
      if (this._apidetails !== value) {
        this._apidetails = value || new IapiUrlAdmindetails();
      }
    });

    // Effect to handle parameter changes
    effect(() => {
      const value = this.parameter();
      if (this._parameter !== value) {
        this._parameter = value || new ICommonFilterAdminRequest();
        this.parameterChange.emit(this._parameter);
      }
    });

    // Effect to handle triggerAPI changes
    effect(() => {
      const value = this.triggerAPI();
      if (this.triggerCourseTypeAPI === value) {
        return;
      }
      this.triggerCourseTypeAPI = value;
    });

    // Effect to handle triggercatch changes
    effect(() => {
      const value = this.triggercatch();
      this._triggercatch = value;
      this.catchdataload();
    });

    // Effect to handle Semester changes
    effect(() => {
      const value = this.Semester();
      if (this._semester === value) {
        return;
      }
      this._semester = value;
    });

    // Effect to handle hidesection changes
    effect(() => {
      const value = this.hidesection();
      this._hidesection = value;
    });

    // Effect to handle isdisabled changes
    effect(() => {
      const value = this.isdisabled();
      this._disabled = value;
    });
  }
  public _parameter: ICommonFilterAdminRequest = new ICommonFilterAdminRequest();
  parameter = input<ICommonFilterAdminRequest>();
  @Output() parameterChange = new EventEmitter<ICommonFilterAdminRequest>();
  // #endregion
  get triggerchild() {
    return this.triggerCourseTypeAPI;
  }
  triggerAPI = input<any>();
  public _triggercatch: boolean = false;
  triggercatch = input<boolean>(false);
  @Output()
  sectionApiSuccess = new EventEmitter<boolean>();
  @Output()
  courseIsChange = new EventEmitter<boolean>();
  @Output()
  sectionIsChange = new EventEmitter<boolean>();

  public _semester: string = '';
  Semester = input<string>('');
  @Output()
  SemesterChange = new EventEmitter<string>();
  public _hidesection: boolean = false;
  hidesection = input<boolean>(false);

  public _disabled: boolean = false;
  isdisabled = input<boolean>(false);

  ngOnInit() {}
  onBatchChange() {
    this._parameter.courseCode = '';
    this._parameter.section = '';
    this.loadSemester();
    this.onSelectChange();
  }
  onCourseChange() {
    this._parameter.section = '';
    this.onSelectChange();
    this.courseIsChange.emit(true);
  }
  ngAfterViewInit(): void {
    this.triggerCourseTypeAPI = true;
  }
  onSelectChange() {
    this.parameterChange.emit(this._parameter);
  }
  onSectionChange() {
    this.onSelectChange();
    this.sectionIsChange.emit(true);
  }
  onSectionAPIResponse() {
    this.sectionApiSuccess.emit(true);
  }
  catchdataload() {
    if (this._triggercatch) {
      if (this._parameter.courseType != '') {
        this.triggerDepartmentAPI = true;
      }
      if (this._parameter.courseType != '' && this._parameter.departmentcode != '') {
        this.triggerCourseAPI = true;
      }
      if (
        this._parameter.courseType != '' &&
        this._parameter.departmentcode != '' &&
        this._parameter.batch != ''
      ) {
        this.triggerCourseAPI = true;
      }
      if (
        this._parameter.courseType != '' &&
        this._parameter.courseCode != '' &&
        this._parameter.batch != ''
      ) {
        this.triggerSectionAPI = true;
      }
      this._triggercatch = false;
    }
  }
  async loadSemester() {
    const semester = await this.FS.GetCurrentSemester(this._parameter.batch, this.area());
    this._semester = semester;
    this.SemesterChange.emit(semester);
  }
}
