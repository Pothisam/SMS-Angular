import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FrameworkModule } from 'src/app/Shared/framework/framework.module';
import { SMSRoutingModule } from './SMS-routing.module';
import { SmsLoginComponent } from '../../User/sms-login/sms-login.component';

@NgModule({
  declarations: [SmsLoginComponent],
  imports: [CommonModule, SMSRoutingModule, FrameworkModule],
})
export class SMSModule {}
