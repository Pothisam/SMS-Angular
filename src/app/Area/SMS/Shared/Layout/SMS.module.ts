import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from '../../User/Login/Login.component';
import { FrameworkModule } from 'src/app/Shared/framework/framework.module';
import { SMSRoutingModule } from './SMS-routing.module';

@NgModule({
  declarations: [
    LoginComponent,
  ],
  imports: [CommonModule, SMSRoutingModule, FrameworkModule],
})
export class SMSModule {}
