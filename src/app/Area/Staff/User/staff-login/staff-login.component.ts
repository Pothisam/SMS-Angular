import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { UserService } from 'src/app/Area/SMS/User/User.service';
import { GlobalService } from 'src/app/Global/Service/global.service';
import { LayoutService } from 'src/app/Global/Service/layout.service';
import { ILoginRequest } from 'src/app/Modules/SMS/User/Request/login.model';
import { CaseType } from 'src/app/Shared/framework/framework.service';

@Component({
  selector: 'app-staff-login',
  templateUrl: './staff-login.component.html',
  styleUrls: ['./staff-login.component.scss'],
  standalone: false,
})
export class StaffLoginComponent implements OnInit, AfterViewInit {
  StaffToken: string | null | undefined;
  CaseType: CaseType = CaseType.U;
  public LoginRequest: ILoginRequest = {
    userName: '',
    password: '',
  };
  constructor(
    private Location: Location,
    private router: Router,
    private layout: LayoutService,
    private globalService: GlobalService,
    private userService: UserService,
  ) {}
  ngAfterViewInit(): void {
    throw new Error('Method not implemented.');
  }
  ngOnInit() {
    this.layout.IsStaffNavVisible = false;
    if (this.Location.path().split('/')[1] == 'Staff') {
      if (this.globalService.GLSG('StaffToken') != null) {
        this.userService.getPermission();
        this.router.navigate(['Staff/Dashboard']);
      }
    }
  }
  onRespons(Response: any) {
    if (Response != null) {
      this.globalService.GLSS('StaffToken', JSON.stringify(Response));
      this.userService.getPermission();
      this.router.navigate(['Staff/Dashboard']);
    }
  }
}
