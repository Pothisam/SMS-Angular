import { Component } from '@angular/core';
import { GlobalService } from 'src/app/Global/Service/global.service';
import {
  AddAdminResponse,
  AdminRequestModal,
} from 'src/app/Modules/CMS/Application Settings/AddAdmin';
import { IModalSettings, ModalSize } from 'src/app/Shared/framework/model/model';
import { ITableSettings } from 'src/app/Shared/framework/table/table.model';
import { SettingsService } from '../Settings.service';

@Component({
  selector: 'app-add-admin-user',
  standalone: false,
  templateUrl: './add-admin-user.component.html',
  styleUrl: './add-admin-user.component.scss',
})
export class AddAdminUserComponent {
  request: AdminRequestModal = new AdminRequestModal();
  triggerAPI: boolean = false;
  staffrequest: { departmentcode: string } = { departmentcode: '' };
  data: AddAdminResponse[] = [];
  public _modalSettings: IModalSettings = new IModalSettings();
  accessList: AccessListType[] = [
    {
      name: 'Change Institution',
      desc: 'Able to change institution',
      value: false,
    },
    {
      name: 'Application Settings',
      desc: "allows access application's settings page",
      value: false,
    },
    {
      name: 'Staff',
      desc: 'allows access to staff releated page',
      value: false,
    },
    {
      name: 'Student',
      desc: 'allows access to student releated page',
      value: false,
    },
    {
      name: 'Management',
      desc: 'allows access to management releated page',
      value: false,
    },
  ];

  public tableSettings: ITableSettings = {
    showFotter: false,
    showPagination: true,
    jsonData: undefined,
    shorting: true,
    slno: true,
    profileImage: true,
    checkbox: false,
    class: 'TableApplicationList',
    columns: [
      { title: 'Name', data: 'name', short: true, width: 20 },
      { title: 'Allowed to Login', data: 'allowLogin', short: true, width: 20 },
      {
        title: 'Access to screen',
        data: 'otherSettings',
        short: true,
        width: 40,
        render: (row: any) => {
          return this.renderOtherSettingsAsChips(row, 'otherSettings');
        },
      },
      {
        title: 'Action',
        data: 'Mat-Action',
        width: 10,
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

  ngOnInit() {
    this.getAdminList();
  }

  constructor(
    private globalService: GlobalService,
    private settingsService: SettingsService,
  ) {}

  getAdminList() {
    this.settingsService.getAdminUser().subscribe((res) => {
      this.data = res.data;
    });
  }

  onMatIconClick(event: any) {
    const targetElement = event.target as HTMLElement;
    this._modalSettings.headerMessage = 'Add New Admin';
    // this._modalSettings.targetHTML = targetElement;
    this._modalSettings.isModalVisible = true;
    this._modalSettings.modalSize = ModalSize.lg;
    this._modalSettings.isDeleteForm = false;
    this._modalSettings.modalId = 'add-edit-admin-user';
    this._modalSettings.api = '/CMSSettings/AddOrUpdateAdminUser';
    this._modalSettings.formId = 'addadminuser';
    this._modalSettings.validationGroup = 'default';
    this._modalSettings.buttonGroup = ['add'];
    this._modalSettings.getInputParameter = () => {
      return this.request;
    };
    this._modalSettings.responseOkAction = (res: any) => {
      this.getAdminList();
      if (res.status == '200') {
        this.request = new AdminRequestModal();
      }
    };
    this.globalService.updateModelDeleteConfirmation(this._modalSettings);
  }

  OpenEditModal(row: any) {
    this.staffrequest.departmentcode = this.data.filter(
      (x) => x.sysid == row.sysid,
    )[0].departmentCode;
    this.triggerAPI = true;
    this.request = {
      allowLogin: row.allowLogin,
      otherSettings: row.otherSettings,
      fid: row.fidstaff,
    };
    this.UpdateAccessChipForEdit(row.otherSettings);

    this._modalSettings.headerMessage = 'Edit Admin User';
    this._modalSettings.isModalVisible = true;
    this._modalSettings.modalSize = ModalSize.lg;
    this._modalSettings.isDeleteForm = false;
    this._modalSettings.modalId = 'add-edit-admin-user';
    this._modalSettings.api = '/CMSSettings/AddOrUpdateAdminUser';
    this._modalSettings.formId = 'addadminuser';
    this._modalSettings.validationGroup = 'default';
    this._modalSettings.buttonGroup = ['edit'];
    this._modalSettings.getInputParameter = () => {
      return this.request;
    };
    this._modalSettings.responseOkAction = (res: any) => {
      this.getAdminList();
      if (res.status == '200') {
        this.request = new AdminRequestModal();
      }
    };

    this._modalSettings.onModalClose = () => {
      this.request = new AdminRequestModal();
      this.staffrequest.departmentcode = '';
      this.UpdateAccessChipForEdit('');
    };

    this.globalService.updateModelDeleteConfirmation(this._modalSettings);
  }

  UpdateAllowLogin(value: string) {
    this.request.allowLogin = value;
  }

  UpdateAccessChipForEdit(list: string) {
    this.accessList.forEach((access) => {
      if (list.includes(access.name)) {
        access.value = true;
      } else {
        access.value = false;
      }
    });
  }

  addFromChipClick(name: string, value: boolean) {
    console.log('before', this.request);
    var allowedAccess = this.request.otherSettings.split(',');
    this.request.otherSettings = '';
    if (value) {
      if (!allowedAccess.includes(name)) {
        allowedAccess.push(name);
        this.accessList.forEach((access) => {
          if (access.name === name) access.value = value;
        });
      }
    } else {
      if (allowedAccess.includes(name)) {
        allowedAccess = allowedAccess.filter((access) => access !== name);
        this.accessList.forEach((access) => {
          if (access.name === name) access.value = value;
        });
      }
    }
    this.request.otherSettings = allowedAccess
      .filter((s) => s !== '')
      .sort()
      .join(',');
  }

  renderOtherSettingsAsChips(row: any, columnname: string): string {
    var allowedAccess = row[columnname].split(',').sort() as string[];
    var element = '<div class="d-inline">';
    allowedAccess.forEach((access) => {
      element +=
        '<span class="m-1 p-2 rounded-5 text-black" style="background-color: rgb(201, 207, 212) !important;">' +
        access +
        '</span>';
    });
    element += '</div>';
    return element;
  }
}

class AccessListType {
  name: string = '';
  desc: string = '';
  value: boolean = false;
}
