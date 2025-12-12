import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StaffLoginComponent } from '../User/staff-login/staff-login.component';
import { NoaccessComponent } from 'src/app/Shared/common/noaccess/noaccess.component';
import { StaffdashboardComponent } from '../Dashboard/staffdashboard/staffdashboard.component';
import { ClassInchargeComponent } from '../Department/ClassIncharge/ClassIncharge.component';
import { FeesDefaultersReportComponent } from '../Department/FeesDefaultersReport/FeesDefaultersReport.component';
import { HODGuard, StaffIsLogin } from '../User/gaurds';
import { IssueTCComponent } from '../Department/IssueTC/IssueTC.component';
import { AddSubjectComponent } from '../Subject/AddSubject/AddSubject.component';
import { AddCourseInstructorComponent } from '../Subject/AddCourseInstructor/AddCourseInstructor.component';
import { StudentTimeTableComponent } from '../TimeTable/StudentTimeTable/StudentTimeTable.component';
import { SubstitutionComponent } from '../TimeTable/Substitution/Substitution.component';
import { MarkEntryComponent } from '../Subject/MarkEntry/MarkEntry.component';
import { UnsavedChangesGuard } from 'src/app/Shared/guard/UnsavedChangesGuard';
import { MarkreportComponent } from '../Subject/Print/markreport/markreport.component';
import { MarkReportComponent } from '../Subject/MarkReport/MarkReport.component';
import { MarkAnalysisReportComponent } from '../Subject/MarkAnalysisReport/MarkAnalysisReport.component';
import { MarkAnalysisComponent } from '../Subject/Print/markAnalysis/markAnalysis.component';
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
  {
    path: 'ClassIncharge',
    component: ClassInchargeComponent,
    canActivate: [StaffIsLogin, HODGuard],
  },
  {
    path: 'FeesDefaultersReport',
    component: FeesDefaultersReportComponent,
    canActivate: [StaffIsLogin, HODGuard],
  },
  {
    path: 'IssueTC',
    component: IssueTCComponent,
    canActivate: [StaffIsLogin, HODGuard],
  },
  {
    path: 'AddSubject',
    component: AddSubjectComponent,
    canActivate: [StaffIsLogin, HODGuard],
  },
  {
    path: 'AddCourseInstructor',
    component: AddCourseInstructorComponent,
    canActivate: [StaffIsLogin, HODGuard],
  },
  {
    path: 'StudentTimeTable',
    component: StudentTimeTableComponent,
    canActivate: [StaffIsLogin],
  },
  {
    path: 'Substitution',
    component: SubstitutionComponent,
    canActivate: [StaffIsLogin],
  },
  {
    path: 'StudentMarkEntry',
    component: MarkEntryComponent,
    canActivate: [StaffIsLogin],
    canDeactivate: [UnsavedChangesGuard],
  },
  {
    path: 'StudentMarkPrint',
    component: MarkreportComponent,
    canActivate: [StaffIsLogin],
    data: { isprint: true },
  },
  {
    path: 'StudentMarkReport',
    component: MarkReportComponent,
    canActivate: [StaffIsLogin],
  },
  {
    path: 'MarkAnalysisReport',
    component: MarkAnalysisReportComponent,
    canActivate: [StaffIsLogin],
  },
  {
    path: 'MarkAnalysisPrint',
    component: MarkAnalysisComponent,
    canActivate: [StaffIsLogin],
    data: { isprint: true },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StaffRoutingModule {}
