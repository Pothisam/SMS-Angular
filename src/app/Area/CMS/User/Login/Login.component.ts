import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { LayoutService } from 'src/app/Global/Service/layout.service';
import { GlobalService } from 'src/app/Global/Service/global.service';
import { FormValidationService } from 'src/app/Shared/formValidation.service';
import { ILoginRequest } from 'src/app/Modules/CMS/User/Request/login.model';
import { UserService } from 'src/app//Area/CMS/User/User.service';
import { CaseType } from 'src/app/Shared/framework/framework.service';
@Component({
  selector: 'app-Login',
  templateUrl: './Login.component.html',
  styleUrls: ['./Login.component.css'],
  standalone: false,
})
export class LoginComponent implements OnInit, AfterViewInit {
  CMSToken: string | null | undefined;
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

  ngOnInit() {
    this.layout.IsCMSNavVisible = false;
    if (this.Location.path().split('/')[1] == 'CMS') {
      if (this.globalService.GLSG('CMSToken') != null) {
        this.userService.getPermission();
        this.router.navigate(['CMS/Dashboard']);
      }
    }
  }
  ngAfterViewInit(): void {}

  onRespons(Response: any) {
    if (Response != null) {
      this.globalService.GLSS('CMSToken', JSON.stringify(Response));
      this.userService.getPermission();
      this.router.navigate(['CMS/Dashboard']);
    }
  }
}
