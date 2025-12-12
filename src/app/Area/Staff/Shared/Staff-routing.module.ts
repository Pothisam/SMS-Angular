import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StaffLoginComponent } from '../User/staff-login/staff-login.component';
import { NoaccessComponent } from 'src/app/Shared/common/noaccess/noaccess.component';
import { StaffdashboardComponent } from '../Dashboard/staffdashboard/staffdashboard.component';

import { HODGuard, StaffIsLogin } from '../User/gaurds';

import { UnsavedChangesGuard } from 'src/app/Shared/guard/UnsavedChangesGuard';

const routes: Routes = [
  { path: 'Staff', component: StaffLoginComponent },
  { path: 'no-access', component: NoaccessComponent },
  {
    path: 'Login',
    component: StaffLoginComponent,
  },
  {
    path: 'Dashboard',
    component: StaffdashboardComponent,
    canActivate: [StaffIsLogin],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StaffRoutingModule {}
