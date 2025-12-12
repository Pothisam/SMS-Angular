import { Component, ElementRef, Renderer2 } from '@angular/core';
import {
  StudentAddApplicationFormRequestModel,
  StudentApplicationEditResponseModel,
  StudentApplicationListResponse,
} from 'src/app/Modules/CMS/Student/Student';
import { ITableSettings } from 'src/app/Shared/framework/table/table.model';
import { StudentService } from '../student.service';
import { FrameworkService } from 'src/app/Shared/framework/framework.service';
import { IModalSettings } from 'src/app/Shared/framework/model/model';
import { GlobalService } from 'src/app/Global/Service/global.service';
import { ListRange } from '@angular/cdk/collections';

@Component({
  selector: 'app-application-form',
  standalone: false,
  templateUrl: './application-form.component.html',
  styleUrl: './application-form.component.scss',
})
export class ApplicationFormComponent {
  // #region arrays (1)
  public applicationList: StudentApplicationListResponse[] = [];
  // #endregion

  // #region objects (2)
  public AddFromRequest: StudentAddApplicationFormRequestModel =
    new StudentAddApplicationFormRequestModel();
  public EditFormRequest: StudentApplicationEditResponseModel =
    new StudentApplicationEditResponseModel();
  public remarkRequest: { sysid: number; remark: string } = { sysid: 0, remark: '' };
  public request: { year: string } = { year: '' };
  public _modalSettings: IModalSettings = new IModalSettings();
  public tableSettings: ITableSettings = {
    showFotter: false,
    showPagination: true,
    jsonData: undefined,
    shorting: true,
    slno: true,
    profileImage: false,
    checkbox: false,
    class: 'TableApplicationList',
    columns: [
      { title: 'Aplication No', data: 'applicationNo', short: true, width: 7 },
      { title: 'Student Name', data: 'studentName', short: true, width: 10 },
      { title: 'Mobile No', data: 'mobileNo', short: true, width: 8 },
      { title: 'Alternate Moblie No', data: 'alternateMobileNo', short: true, width: 9 },
      { title: 'Course Type', data: 'courseType', short: true, width: 7 },
      { title: 'Department Name', data: 'departmentName', short: true, width: 8 },
      { title: 'Course', data: 'course', short: true, width: 13 },
      {
        title: 'Remark',
        data: 'remark',
        short: true,
        width: 12,
        render: (row: any) => this.renderRemarkInput(row, 'remark'),
      },
      {
        title: 'Status',
        data: 'status',
        short: true,
        width: 5,
        render: (row: any) => this.renderJoinedStatus(row, 'status'),
      },
      {
        title: 'Action',
        data: 'Mat-Action',
        width: 5,
        buttongroup: [
          {
            button: true,
            buttondata: 'sysId',
            buttons: ['info', 'edit'],
            click: (row: any) => {
              this.OpenEditModal(row);
            },
          },
        ],
        buttonlabel: 'sysId',
      },
    ],
    columnSticky: [0, 1, 2],
    headerSticky: true,
    filter: false,
  };
  // #endregion

  constructor(
    private student: StudentService,
    private fws: FrameworkService,
    private globalService: GlobalService,
    private el: ElementRef,
    private renderer: Renderer2,
  ) {}

  // #region functions
  ngAfterViewInit() {
    if (this.fws.CSSE('filter')) {
      this.fws.loadFromSessionStorage('filter', this.request);
      if (this.request.year !== null) {
        this.getApplicationList();
      }
    } else {
      this.getApplicationList();
    }
    this.RemarkChangeEvent();
  }

  SyncAddRequest(newRequest: StudentAddApplicationFormRequestModel) {
    this.AddFromRequest = newRequest;
  }

  SyncEditRequest(newRequest: StudentApplicationEditResponseModel) {
    this.EditFormRequest = newRequest;
  }

  getApplicationList() {
    this.fws.SSSV('filter', this.request);
    this.student.getApplicationList(this.request).subscribe((res) => {
      this.applicationList = res.data;
    });
  }

  onMatIconClick(event: Event) {
    const targetElement = event.target as HTMLElement;
    this._modalSettings.headerMessage = 'New Student Application Form';
    // this._modalSettings.targetHTML = targetElement;
    this._modalSettings.isModalVisible = true;
    this._modalSettings.isDeleteForm = false;
    this._modalSettings.modalId = 'application-add-form';
    this._modalSettings.api = '/Student/InsertApplicationForm';
    this._modalSettings.formId = 'addApplicationForm';
    this._modalSettings.validationGroup = 'default';
    this._modalSettings.buttonGroup = ['add'];
    this._modalSettings.getInputParameter = () => {
      return this.AddFromRequest;
    };
    this._modalSettings.responseOkAction = (res: any) => {
      this.getApplicationList();
      if (res.status == '200') {
        this.AddFromRequest = new StudentAddApplicationFormRequestModel();
      }
    };
    this.globalService.updateModelDeleteConfirmation(this._modalSettings);
  }

  OpenEditModal(row: any) {
    this.EditFormRequest = row;

    this._modalSettings.headerMessage = 'Edit Student Application Form';
    this._modalSettings.isModalVisible = true;
    this._modalSettings.isDeleteForm = false;
    this._modalSettings.modalId = 'application-edit-form';
    this._modalSettings.api = '/Student/UpdateApplicationFormByID';
    this._modalSettings.formId = 'addApplicationForm';
    this._modalSettings.validationGroup = 'default';
    this._modalSettings.targetHTML = null;
    this._modalSettings.buttonGroup = ['edit'];
    this._modalSettings.getInputParameter = () => {
      return this.EditFormRequest;
    };

    this.globalService.updateModelDeleteConfirmation(this._modalSettings);
  }

  renderJoinedStatus(row: any, columnname: string): string {
    var span = '';
    if (row[columnname] == 'Joined') {
      span = '<span class="text-success fst-italic fw-bold">Joined</span>';
    } else {
      span = '<span class="text-danger fst-italic fw-bold">Not Joined</span>';
    }
    return span;
  }

  renderRemarkInput(row: any, columnName: string) {
    return `<input type="text" id="remark_table_row_${row.sysid.toString()}" data-sysid="${row.sysid.toString()}" class="RemarkField form-control" value="${row[
      columnName
    ].toString()}">`;
  }

  RemarkChangeEvent() {
    const table = this.el.nativeElement.querySelector('.TableApplicationList tbody');
    // Check if the table exists before adding event listeners
    if (table) {
      this.renderer.listen(table, 'change', (event) => {
        // Only handle events from select elements with the "Semester" class
        if (event.target && event.target.classList.contains('RemarkField')) {
          const status = event.target.value;
          const sysid = event.target.getAttribute('data-Sysid');

          this.remarkRequest.sysid = sysid;
          this.remarkRequest.remark = status;
          const batchItem = this.applicationList.find(
            (item) => Number(item.sysid) === Number(sysid),
          );
          if (batchItem) {
            // Update the found batch item's semester or any other property
            batchItem.remark = status;
          }
          if (this.remarkRequest.remark) this.UpdateRemark();
        }
      });
    }
  }

  UpdateRemark() {
    this.student.UpdateStudentRemark(this.remarkRequest).subscribe((res) => {
      if (res.status == '200')
        this.applicationList.forEach((item) =>
          item.sysid === this.remarkRequest.sysid
            ? { ...item, remark: this.remarkRequest.remark }
            : item,
        );
    });
  }
  // #endregion
}
