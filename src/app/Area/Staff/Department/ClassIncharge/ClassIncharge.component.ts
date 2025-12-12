import { Component, OnInit } from '@angular/core';
import { ISectionRequest } from 'src/app/Modules/CMS/section/Section';
import {
  InsertStaffInchargeRequest,
  StaffInchargeResponse,
} from 'src/app/Modules/Staff/Department/ClassIncharge';
import { IapiUrldetails, ICommonFilterRequest } from 'src/app/Modules/Staff/Shared/CommonFilter';
import { ITableSettings } from 'src/app/Shared/framework/table/table.model';
import { HODServiceService } from '../HODService.service';

@Component({
  selector: 'app-ClassIncharge',
  templateUrl: './ClassIncharge.component.html',
  styleUrls: ['./ClassIncharge.component.css'],
  standalone: false,
})
export class ClassInchargeComponent implements OnInit {
  request: InsertStaffInchargeRequest = new InsertStaffInchargeRequest();
  public Staffrequest: ISectionRequest = {
    departmentCode: '',
  };
  triggerstaffapi: boolean = false;
  triggerchildapi: boolean = false;
  public apidetails: IapiUrldetails = new IapiUrldetails();
  public _parameter: ICommonFilterRequest = new ICommonFilterRequest();
  _loading: boolean = false;
  constructor(private hodService: HODServiceService) {}

  ngOnInit() {
    this.apidetails.coursetypeapiUrl = '/Course/GetCourseType';
    this.apidetails.courseapiUrl = '/Staff/HODGetCourseNameByCourseTypeandBatch';
    this.apidetails.batchapiUrl = '/Staff/HODGetBatchByCourseType';
    this.apidetails.sectionapiUrl = '/Staff/HODGetSectionListByCourseTypeBatchandCourseCode';
    this.childparameter.isActive = true;
    this.GetStaffList();
  }
  // #region table settings
  staffIncharge: StaffInchargeResponse[] = [];
  childparameter: ICommonFilterRequest = new ICommonFilterRequest();
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
        title: 'Name',
        data: 'name',
        short: true,
        width: 20,
      },
      {
        title: 'Course Type',
        data: 'courseType',
        short: true,
        width: 10,
      },
      {
        title: 'Batch',
        data: 'batch',
        short: true,
        width: 10,
      },

      {
        title: 'Course Name',
        data: 'classdetails',
        short: true,
        width: 20,
      },

      {
        title: 'Action',
        data: 'Mat-Action',
        width: 20,
        buttongroup: [
          {
            button: true,
            buttondata: 'sysid',
            buttons: ['info', 'delete'],
            click: [
              'delete|sysid|sysid|/StaffIncharge/DeleteStaffInchargeDetails|sysid|Are sure you want to Delete this record ?||true',
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
  async GetStaffList(): Promise<void> {
    this._loading = true;

    this.hodService.getStaffInchargeDetails().subscribe({
      next: (Response) => {
        if (Response.data != null) {
          this.staffIncharge = Response.data;
        }
      },
    });
    this._loading = false;
  }
  onParameterChange(event: ICommonFilterRequest): void {
    this.request.courseType = event.courseType;
    this.request.batch = event.batch;
    this.request.courseCode = event.courseCode;
    this.request.section = event.section;
  }
  onRespons(Response: any) {
    if (Response != null) {
      this.GetStaffList();
      this.request = new InsertStaffInchargeRequest();
      this.childparameter = new ICommonFilterRequest();
      this.childparameter.isActive = true;
      this.Staffrequest.departmentCode = '';
    }
  }
}
