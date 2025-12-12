import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SmsLoginComponent } from '../../User/sms-login/sms-login.component';
import { NoaccessComponent } from 'src/app/Shared/common/noaccess/noaccess.component';

const routes: Routes = [
  { path: '', component: SmsLoginComponent },
  { path: 'no-access', component: NoaccessComponent },
  {
    path: 'Login',
    component: SmsLoginComponent,
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SMSRoutingModule {}
