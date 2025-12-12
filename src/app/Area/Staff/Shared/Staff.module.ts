import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StaffLoginComponent } from '../User/staff-login/staff-login.component';
import { StaffRoutingModule } from './Staff-routing.module';
import { FrameworkModule } from 'src/app/Shared/framework/framework.module';
import { StaffdashboardComponent } from '../Dashboard/staffdashboard/staffdashboard.component';
import { CommonFilterComponent } from './CommonFilter/CommonFilter.component';

import { commonModule } from 'src/app/Shared/common/common.module';

import { CommonFilterAdminComponent } from './CommonFilter-Admin/CommonFilter-Admin.component';

@NgModule({
  declarations: [
    StaffLoginComponent,
    StaffdashboardComponent,
    CommonFilterComponent,

    CommonFilterAdminComponent,
  ],
  imports: [CommonModule, StaffRoutingModule, FrameworkModule, commonModule],
})
export class StaffModule {}
