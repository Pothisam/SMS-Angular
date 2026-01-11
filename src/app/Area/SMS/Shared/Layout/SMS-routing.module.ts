import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../../User/Login/Login.component';
import { NoaccessComponent } from 'src/app/Shared/common/noaccess/noaccess.component';
import { SmsDashboardComponent } from '../../Dashboard/SmsDashboard/SmsDashboard.component';
import { SMSIsLogin } from '../../User/Login/gaurds';
import { InstitutionComponent } from '../../Management/Institution/Institution.component';
import { ClassComponent } from '../../Management/Class/Class.component';
import { ClassSectionComponent } from '../../Management/ClassSection/ClassSection.component';
import { AcademicYearComponent } from '../../Management/AcademicYear/AcademicYear.component';
import { AddStaffComponent } from '../../Staff/AddStaff/AddStaff.component';
import { ViewStaffComponent } from '../../Staff/ViewStaff/ViewStaff.component';
import { ViewStaffListComponent } from '../../Staff/ViewStaffList/ViewStaffList.component';
import { AddStudentComponent } from '../../Student/AddStudent/AddStudent.component';
import { ViewStudentListComponent } from '../../Student/ViewStudentList/ViewStudentList.component';
import { ViewStudentComponent } from '../../Student/viewStudent/viewStudent.component';
import { ChangePasswordComponent } from '../../User/ChangePassword/ChangePassword.component';

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
    canActivate: [SMSIsLogin],
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
  {
    path: 'Class',
    component: ClassComponent,
    canActivate: [SMSIsLogin],
  },
  {
    path: 'Section',
    component: ClassSectionComponent,
    canActivate: [SMSIsLogin],
  },
  {
    path: 'AcademicYear',
    component: AcademicYearComponent,
    canActivate: [SMSIsLogin],
  },
  {
    path: 'AcademicYear',
    component: AcademicYearComponent,
    canActivate: [SMSIsLogin],
  },
  {
    path: 'AddStaff',
    component: AddStaffComponent,
    canActivate: [SMSIsLogin],
  },
  {
    path: 'ViewStaffs',
    component: ViewStaffListComponent,
    canActivate: [SMSIsLogin],
  },
  {
    path: 'ViewStaff',
    component: ViewStaffComponent,
    canActivate: [SMSIsLogin],
  },
  {
    path: 'AddStudent',
    component: AddStudentComponent,
    canActivate: [SMSIsLogin],
  },
  {
    path: 'ViewStudentList',
    component: ViewStudentListComponent,
    canActivate: [SMSIsLogin],
  },
  {
    path: 'ViewStudent',
    component: ViewStudentComponent,
    canActivate: [SMSIsLogin],
  },
];

@NgModule({
  imports: [RouterModule.forChild(CMSroutes)],
  exports: [RouterModule],
})
export class SMSRoutingModule {}
