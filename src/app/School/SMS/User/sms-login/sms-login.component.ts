import { Component, OnInit } from '@angular/core';
import { ILoginRequest } from 'src/app/Modules/CMS/User/Request/login.model';
import { CaseType } from 'src/app/Shared/framework/framework.service';

@Component({
  selector: 'app-sms-login',
  templateUrl: './sms-login.component.html',
  styleUrls: ['./sms-login.component.css'],
  standalone: false,
})
export class SmsLoginComponent implements OnInit {
  CaseType: CaseType = CaseType.U;
  public LoginRequest: ILoginRequest = {
    userName: '',
    password: '',
  };
  constructor() {}

  ngOnInit() {}
  onRespons(Response: any) {
    if (Response != null) {
    }
  }
}
