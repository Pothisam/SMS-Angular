import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalService } from 'src/app/Global/Service/global.service';
import { LayoutService } from 'src/app/Global/Service/layout.service';
import { ILoginRequest } from 'src/app/Modules/SMS/User/Request/login.model';
import { CaseType } from 'src/app/Shared/framework/framework.service';
import { Location } from '@angular/common';
@Component({
  selector: 'app-Login',
  templateUrl: './Login.component.html',
  styleUrls: ['./Login.component.scss'],
  standalone: false,
})
export class LoginComponent implements OnInit {
  SMSToken: string | null | undefined;
  CaseType: CaseType = CaseType.U;
  public LoginRequest: ILoginRequest = {
    userName: '',
    password: '',
  };
  constructor(
    private router: Router,
    private layout: LayoutService,
    private globalService: GlobalService,
    private Location: Location,
  ) {}

  ngOnInit() {
    this.layout.IsFeesNavVisible = false;
    if (this.Location.path().split('/')[1] == 'Fees') {
      if (this.globalService.GLSG('FeesToken') != null) {
        // this.userService.getPermission();
        this.router.navigate(['Fees/Dashboard']);
      }
    }
  }
  onRespons(Response: any) {
    if (Response != null) {
      this.globalService.GLSS('FeesToken', JSON.stringify(Response));
      // this.userService.getPermission();
      this.router.navigate(['Fees/Dashboard']);
    }
  }
}
