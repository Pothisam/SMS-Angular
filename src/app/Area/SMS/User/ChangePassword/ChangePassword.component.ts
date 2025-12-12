import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalService } from 'src/app/Global/Service/global.service';
import { ChangePasswordRequest } from 'src/app/Modules/SMS/User/Request/changepassword.model';
import { ApiCallService } from 'src/app/Shared/apiCall.service';

@Component({
  selector: 'app-ChangePassword',
  templateUrl: './ChangePassword.component.html',
  styleUrls: ['./ChangePassword.component.css'],
  standalone: false,
})
export class ChangePasswordComponent implements OnInit {
  request: ChangePasswordRequest = new ChangePasswordRequest();
  hasUppercase: boolean = false;
  hasLowercase: boolean = false;
  hasNumber: boolean = false;
  hasSpecialChar: boolean = false;
  hasMinLength: boolean = false;
  matchnewPassword: boolean = false;
  buttonDisabled: boolean = true;
  constructor(
    private globalService: GlobalService,
    private router: Router,
  ) {}

  ngOnInit() {}
  validatePassword(): void {
    this.hasUppercase = /[A-Z]/.test(this.request.newPassword);
    this.hasLowercase = /[a-z]/.test(this.request.newPassword);
    this.hasNumber = /[0-9]/.test(this.request.newPassword);
    this.hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(this.request.newPassword);
    this.hasMinLength = this.request.newPassword.length >= 8;
    this.matchnewPassword = this.request.newPassword === this.request.confirmPassword;
    this.buttonDisabled = !(
      this.hasUppercase &&
      this.hasLowercase &&
      this.hasNumber &&
      this.hasSpecialChar &&
      this.hasMinLength &&
      this.matchnewPassword
    );
  }
  onRespons() {
    ApiCallService.clearCache();
    localStorage.removeItem('CMSToken');
    this.router.navigate(['CMS/Login']);
  }
}
