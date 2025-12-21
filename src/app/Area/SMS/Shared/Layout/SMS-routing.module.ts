import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../../User/Login/Login.component';
import { NoaccessComponent } from 'src/app/Shared/common/noaccess/noaccess.component';
import { SmsDashboardComponent } from '../../Dashboard/SmsDashboard/SmsDashboard.component';
import { SMSIsLogin } from '../../User/Login/gaurds';
import { InstitutionComponent } from '../../Management/Institution/Institution.component';

const CMSroutes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'no-access', component: NoaccessComponent },
  {
    path: 'Login',
    component: LoginComponent,
  },
  {
    path: 'Dashboard',
    component: SmsDashboardComponent,
    canActivate: [SMSIsLogin],
  },
  {
    path: 'Institution',
    component: InstitutionComponent,
    canActivate: [SMSIsLogin],
  },
];

@NgModule({
  imports: [RouterModule.forChild(CMSroutes)],
  exports: [RouterModule],
})
export class SMSRoutingModule {}
