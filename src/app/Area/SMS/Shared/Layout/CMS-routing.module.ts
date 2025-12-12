import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CmsdashboardComponent } from '../../Dashboard/cmsdashboard/cmsdashboard.component';
import { LoginComponent } from '../../User/Login/Login.component';
import { InstitutionComponent } from '../../Management/Institution/Institution.component';
import { CMSIsLogin } from '../../User/Login/gaurds';
import { cmsroleGuard } from '../../User/Login/Permission/cmsrole.guard';
import { NoaccessComponent } from 'src/app/Shared/common/noaccess/noaccess.component';
import { ChangePasswordComponent } from '../../User/ChangePassword/ChangePassword.component';
import { ChangeInstitutionComponent } from '../../User/ChangeInstitution/ChangeInstitution.component';

const CMSroutes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'no-access', component: NoaccessComponent },
  {
    path: 'Login',
    component: LoginComponent,
  },
  {
    path: 'ChangePassword',
    component: ChangePasswordComponent,
    canActivate: [CMSIsLogin],
  },
  {
    path: 'Dashboard',
    component: CmsdashboardComponent,
    canActivate: [CMSIsLogin],
  },
  {
    path: 'Institution',
    component: InstitutionComponent,
    canActivate: [CMSIsLogin, cmsroleGuard],
    data: { permission: 'Management' },
  },
  {
    path: 'ChangeInstitution',
    component: ChangeInstitutionComponent,
    canActivate: [CMSIsLogin, cmsroleGuard],
    data: { permission: 'Change Institution' },
  },
];

@NgModule({
  imports: [RouterModule.forChild(CMSroutes)],
  exports: [RouterModule],
})
export class CMSRoutingModule {}
