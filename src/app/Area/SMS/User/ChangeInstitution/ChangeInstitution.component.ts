import { Component, OnInit } from '@angular/core';
import { UserService } from '../User.service';
import { ITableSettings } from 'src/app/Shared/framework/table/table.model';
import {
  IChangeInstitutionRequest,
  IGtoupInstitutionResponse,
} from 'src/app/Modules/SMS/User/Request/login.model';
import { Router } from '@angular/router';
import { GlobalService } from 'src/app/Global/Service/global.service';
import { ApiCallService } from 'src/app/Shared/apiCall.service';

@Component({
  selector: 'app-ChangeInstitution',
  templateUrl: './ChangeInstitution.component.html',
  styleUrls: ['./ChangeInstitution.component.css'],
  standalone: false,
})
export class ChangeInstitutionComponent implements OnInit {
  institutionList: IGtoupInstitutionResponse[] = [];
  institutioncode: number = 0;
  changeIns: IChangeInstitutionRequest = {
    institutionCode: 0,
  };
  constructor(
    private userService: UserService,
    private router: Router,
    private globalService: GlobalService,
  ) {}
  public tableInstitution: ITableSettings = {
    showFotter: false,
    showPagination: false,
    jsonData: undefined,
    shorting: false,
    slno: true,
    checkbox: false,
    columns: [
      {
        title: 'Institution Name',
        data: 'institutionName',
        short: true,
        width: 20,
      },
      {
        title: 'Email id',
        data: 'emailid',
        short: true,
        width: 10,
      },
      {
        title: 'Mobile Numer',
        data: 'mobileNumer',
        short: true,
        width: 10,
      },
      {
        title: 'Landline',
        data: 'landline',
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
            buttondata: 'sysid',
            buttons: ['dynamic'],
            dynamic: ['switch_camera', 'Swich Institution'],
          },
        ],
        buttonlabel: 'sysid',
      },
    ],
    columnSticky: [],
    headerSticky: true,
    filter: false,
  };
  ngOnInit() {
    this.GetInstitution();
  }

  GetInstitution() {
    this.userService.getGroupInstitution().subscribe({
      next: (Response) => {
        if (Response.data != null) {
          this.institutionList = Response.data;
        }
      },
    });
  }
  ondynamicClick(value: any): void {
    this.changeIns.institutionCode = value;
    this.userService.ChangeGroupInstitution(this.changeIns).subscribe({
      next: (Response) => {
        if (Response.data != null) {
          this.globalService.GLSS('CMSToken', JSON.stringify(Response.data));
          ApiCallService.clearCache();
          this.userService.getPermission();
          window.location.href = '/CMS/Dashboard';
          location.reload();
          //this.router.navigate(['CMS/Dashboard']);
        }
      },
    });
  }
}
