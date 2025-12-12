import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../../User/Login/Login.component';
import { NoaccessComponent } from 'src/app/Shared/common/noaccess/noaccess.component';

const CMSroutes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'no-access', component: NoaccessComponent },
  {
    path: 'Login',
    component: LoginComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(CMSroutes)],
  exports: [RouterModule],
})
export class SMSRoutingModule {}
