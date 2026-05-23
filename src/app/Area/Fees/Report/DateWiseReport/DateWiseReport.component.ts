import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { FeesReportRequest, FeesReportResponse } from 'src/app/Modules/Fees/Report/DateWiseReport';
import { ITableSettings } from 'src/app/Shared/framework/table/table.model';
import { GlobalService } from 'src/app/Global/Service/global.service';
import { IModalSettings } from 'src/app/Shared/framework/model/model';

@Component({
  selector: 'app-DateWiseReport',
  templateUrl: './DateWiseReport.component.html',
  styleUrls: ['./DateWiseReport.component.scss'],
  standalone: false,
})
export class DateWiseReportComponent implements OnInit {
  public tableSettings: ITableSettings = {
    showFotter: false,
    showPagination: true,
    jsonData: undefined,
    shorting: true,
    slno: true,
    profileImage: false,
    checkbox: false,
    checkboxcondition: { sysId: 'sysid', column: 'status', value: 'Not Generated' },
    columns: [
      {
        title: 'Name',
        data: 'name',
        short: true,
        width: 20,
      },
      {
        title: 'stdid',
        data: 'stdid',
        short: true,
        width: 20,
      },
      {
        title: 'class',
        data: 'className',
        short: true,
        width: 20,
      },
      {
        title: 'section',
        data: 'sectionName',
        short: true,
        width: 20,
      },
      {
        title: 'Acadamic Year',
        data: 'acadamicYear',
        short: true,
        width: 20,
      },
      {
        title: 'Description',
        data: 'description',
        short: true,
        width: 20,
      },
      {
        title: 'Amount',
        data: 'credit',
        short: true,
        width: 20,
        type: 'decimal',
      },

      {
        title: 'Generate Date',
        data: 'generateDate',
        short: true,
        width: 20,
        type: 'date',
      },
      {
        title: 'Action',
        data: 'Mat-Action',
        width: 20,
        buttongroup: [
          {
            button: true,
            buttondata: 'sysId',
            buttons: ['dynamic', 'delete', 'history'],
            click: ['delete|sysId', 'history|StudentFeesTransaction|sysId|'],
            conditions: ['delete|status|Approved'],
            dynamic: ['print', 'Print Receipt'],
          },
        ],
        buttonlabel: 'sysId',
      },
    ],
    columnSticky: [0, 1, 2],
    headerSticky: true,
    filter: true,
    rowCallback: [
      {
        columnname: 'status',
        value: 'Deleted',
        class: 'text-decoration-line-through  text-danger',
      },
      {
        columnname: 'status',
        value: 'Rejected',
        class: 'text-decoration-line-through  text-danger',
      },
    ],
  };
  public list: FeesReportResponse[] = [];
  public request: FeesReportRequest = new FeesReportRequest();
  public triggerTableAPI = false;
  public _modalSettings: IModalSettings = new IModalSettings();
  public deleteReason: string = '';
  constructor(
    private router: Router,
    private location: Location,
    private globalService: GlobalService,
  ) {}

  ngOnInit() {}
  onRespons(Response: any) {
    if (Response != null) {
      this.list = Response;
    }
  }
  ondynamicClick(value: any): void {
    const selecteddata = this.list.find((x) => x.sysId == value);

    const jsonValue = JSON.stringify(selecteddata);
    localStorage.setItem('PrintCashReceipt', jsonValue);
    const w = 900,
      h = 700,
      left = (screen.width - w) / 2,
      top = (screen.height - h) / 2;
    const urlTree = this.router.createUrlTree(['/Fees/PrintCashReceipt']);
    const path = this.location.prepareExternalUrl(this.router.serializeUrl(urlTree));
    window.open(
      path,
      '_blank',
      `width=${w},height=${h},left=${left},top=${top},resizable=yes,scrollbars=yes`,
    );
  }
  onDeleteClick(value: any): void {
    this.deleteReason = '';
    this._modalSettings.headerMessage = 'Delete Fees Record';
    this._modalSettings.targetHTML = null;
    this._modalSettings.isModalVisible = true;
    this._modalSettings.modalSize = 'md';
    this._modalSettings.isDeleteForm = false;
    this._modalSettings.modalId = 'delete-fees-modal';
    this._modalSettings.api = '/StudentFeesTransaction/DeleteTransaction';
    this._modalSettings.formId = 'delete-reason-form';
    this._modalSettings.validationGroup = 'default';
    this._modalSettings.buttonGroup = ['delete'];
    this._modalSettings.note = 'This action cannot be undone.';
    this._modalSettings.parameter = value; // sysId
    this._modalSettings.getInputParameter = () => {
      return {
        sysId: value.sysId,
        remark: this.deleteReason,
      };
    };
    this._modalSettings.responseOkAction = (res: any) => {
      if (res.status === '200') {
        this.triggerTableAPI = true;
        this.deleteReason = '';
      }
    };
    // Add validation function to check if deleteReason is not empty
    (this._modalSettings as any).isFormValid = () => {
      return this.deleteReason && this.deleteReason.trim().length > 0;
    };
    this.globalService.updateModelDeleteConfirmation(this._modalSettings);
  }
}
