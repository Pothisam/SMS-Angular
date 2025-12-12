import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InstitutionComponent } from '../../Management/Institution/Institution.component';
import { CMSRoutingModule } from './CMS-routing.module';
import { LoginComponent } from '../../User/Login/Login.component';
import { CmsdashboardComponent } from '../../Dashboard/cmsdashboard/cmsdashboard.component';

import { FrameworkModule } from 'src/app/Shared/framework/framework.module';

import { ChangePasswordComponent } from '../../User/ChangePassword/ChangePassword.component';
import { ChangeInstitutionComponent } from '../../User/ChangeInstitution/ChangeInstitution.component';

@NgModule({
  declarations: [
    InstitutionComponent,
    LoginComponent,
    CmsdashboardComponent,


    ChangePasswordComponent,

    ChangeInstitutionComponent,

  ],
  imports: [CommonModule, CMSRoutingModule, FrameworkModule],
})
export class CMSModule {}
