import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  CUSTOM_ELEMENTS_SCHEMA,
} from '@angular/core';
import { IapiUrldetails, ICommonFilterRequest } from 'src/app/Modules/Staff/Shared/CommonFilter';
import { FrameworkService } from 'src/app/Shared/framework/framework.service';

@Component({
  selector: 'app-CommonFilter',
  templateUrl: './CommonFilter.component.html',
  styleUrls: ['./CommonFilter.component.css'],
  standalone: false,
})
export class CommonFilterComponent implements OnInit {
  @Input() area: string = 'Staff';
  triggerCourseTypeAPI: boolean = false;
  triggerBatchAPI: boolean = false;
  triggerCourseAPI: boolean = false;
  triggerSectionAPI: boolean = false;
  //valueAndname: string = 'courseCode,courseName';
  public _apidetails: IapiUrldetails = new IapiUrldetails();
  @Input()
  set apiurl(value: IapiUrldetails | undefined) {
    if (this._apidetails !== value) {
      this._apidetails = value || new IapiUrldetails();
    }
  }
  // #region parameter
  public _parameter: ICommonFilterRequest = new ICommonFilterRequest();
  @Input()
  set parameter(value: ICommonFilterRequest | undefined) {
    if (this._parameter !== value) {
      this._parameter = value || new ICommonFilterRequest();
      this.parameterChange.emit(this._parameter);
    }
  }
  get parameter(): ICommonFilterRequest {
    return this._parameter;
  }
  @Output() parameterChange = new EventEmitter<ICommonFilterRequest>();
  // #endregion
  get triggerchild() {
    return this.triggerCourseTypeAPI;
  }
  @Input()
  set triggerAPI(value: any) {
    if (this.triggerCourseTypeAPI === value) {
      return;
    }
    this.triggerCourseTypeAPI = value;
  }
  public _triggercatch: boolean = false;
  @Input()
  set triggercatch(value: boolean) {
    this._triggercatch = value;
    this.catchdataload();
  }
  @Output()
  sectionApiSuccess = new EventEmitter<boolean>();
  @Output()
  courseIsChange = new EventEmitter<boolean>();
  @Output()
  sectionIsChange = new EventEmitter<boolean>();

  public _semester: string = '';
  @Input()
  set Semester(value: any) {
    if (this._semester === value) {
      return;
    }
    this._semester = value;
  }
  get Semester() {
    return this._semester;
  }
  @Output()
  SemesterChange = new EventEmitter<string>();
  public _hidesection: boolean = false;
  @Input()
  set hidesection(value: boolean) {
    this._hidesection = value;
  }

  public _disabled: boolean = false;
  @Input()
  set isdisabled(value: boolean) {
    this._disabled = value;
  }
  constructor(private FS: FrameworkService) {}

  ngOnInit() {
    //this.valueAndname = 'courseCode,courseName';
  }
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
        this.triggerBatchAPI = true;
      }
      if (this._parameter.courseType != '' && this._parameter.batch != '') {
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
    const semester = await this.FS.GetCurrentSemester(this._parameter.batch, this.area);
    this._semester = semester;
    this.SemesterChange.emit(semester);
  }
}
