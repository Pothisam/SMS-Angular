import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CmsdashboardComponent } from '../../Dashboard/cmsdashboard/cmsdashboard.component';
import { LoginComponent } from '../../User/Login/Login.component';
import { InstitutionComponent } from '../../Management/Institution/Institution.component';
import { CMSIsLogin } from '../../User/Login/gaurds';
import { DepartmentComponent } from '../../Management/department/department.component';
import { SectionComponent } from '../../Management/section/section.component';
import { CourseComponent } from '../../Management/course/course.component';
import { BatchComponent } from '../../Management/batch/batch.component';
import { HolidayComponent } from '../../Management/holiday/holiday.component';
import { AddStaffComponent } from '../../Staff/AddStaff/AddStaff.component';
import { ViewStaffListComponent } from '../../Staff/ViewStaffList/ViewStaffList.component';
import { ViewStaffComponent } from '../../Staff/ViewStaff/ViewStaff.component';
import { AddStudentComponent } from '../../Student/AddStudent/AddStudent.component';
import { ViewStudentListComponent } from '../../Student/ViewStudentList/ViewStudentList.component';
import { ExportStudentDetailsComponent } from '../../Report/ExportStudentDetails/ExportStudentDetails.component';
import { ViewStudentComponent } from '../../Student/viewStudent/viewStudent.component';
import { AdminssionReportComponent } from '../../Report/adminssion-report/adminssion-report.component';
import { StudentStatusReportComponent } from '../../Report/student-status-report/student-status-report.component';
import { ConcessionReportComponent } from '../../Report/concession-report/concession-report.component';
import { ScholarshipReportComponent } from '../../Report/scholarship-report/scholarship-report.component';
import { ExportStaffDetailsComponent } from '../../Report/export-staff-details/export-staff-details.component';
import { StaffStatusReportComponent } from '../../Report/staff-status-report/staff-status-report.component';
import { cmsroleGuard } from '../../User/Login/Permission/cmsrole.guard';
import { NoaccessComponent } from 'src/app/Shared/common/noaccess/noaccess.component';
import { ApplicationFormComponent } from '../../Student/application-form/application-form.component';
import { ChangePasswordComponent } from '../../User/ChangePassword/ChangePassword.component';
import { StaffAttendanceSettingsComponent } from '../../Application Settings/Staff Attendance Settings/staff-attendance-settings/staff-attendance-settings.component';
import { FeesSettingsComponent } from '../../Application Settings/fees-settings/fees-settings.component';
import { ChangeInstitutionComponent } from '../../User/ChangeInstitution/ChangeInstitution.component';
import { AddAdminUserComponent } from '../../Application Settings/add-admin-user/add-admin-user.component';
import { TransferCertificateReportComponent } from '../../Report/transfer-certificate-report/transfer-certificate-report.component';

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
    path: 'Department',
    component: DepartmentComponent,
    canActivate: [CMSIsLogin, cmsroleGuard],
    data: { permission: 'Management' },
  },
  {
    path: 'Course',
    component: CourseComponent,
    canActivate: [CMSIsLogin, cmsroleGuard],
    data: { permission: 'Management' },
  },
  {
    path: 'Section',
    component: SectionComponent,
    canActivate: [CMSIsLogin, cmsroleGuard],
    data: { permission: 'Management' },
  },
  {
    path: 'Batch',
    component: BatchComponent,
    canActivate: [CMSIsLogin, cmsroleGuard],
    data: { permission: 'Management' },
  },
  {
    path: 'Holiday',
    component: HolidayComponent,
    canActivate: [CMSIsLogin, cmsroleGuard],
    data: { permission: 'Management' },
  },
  {
    path: 'AddStaff',
    component: AddStaffComponent,
    canActivate: [CMSIsLogin, cmsroleGuard],
    data: { permission: 'Staff' },
  },
  {
    path: 'ViewStaffList',
    component: ViewStaffListComponent,
    canActivate: [CMSIsLogin, cmsroleGuard],
    data: { permission: 'Staff' },
  },
  {
    path: 'ViewStaff',
    component: ViewStaffComponent,
    canActivate: [CMSIsLogin, cmsroleGuard],
    data: { permission: 'Staff' },
  },
  {
    path: 'AddStudent',
    component: AddStudentComponent,
    canActivate: [CMSIsLogin, cmsroleGuard],
    data: { permission: 'Student' },
  },
  {
    path: 'ViewStudentlist',
    component: ViewStudentListComponent,
    canActivate: [CMSIsLogin, cmsroleGuard],
    data: { permission: 'Student' },
  },
  {
    path: 'ViewStudent',
    component: ViewStudentComponent,
    canActivate: [CMSIsLogin, cmsroleGuard],
    data: { permission: 'Student' },
  },
  {
    path: 'ExportStudentDetails',
    component: ExportStudentDetailsComponent,
    canActivate: [CMSIsLogin],
  },
  {
    path: 'AdminssionReport',
    component: AdminssionReportComponent,
    canActivate: [CMSIsLogin],
  },
  {
    path: 'StudentStatusReport',
    component: StudentStatusReportComponent,
    canActivate: [CMSIsLogin],
  },
  {
    path: 'ConcessionReport',
    component: ConcessionReportComponent,
    canActivate: [CMSIsLogin],
  },
  {
    path: 'StaffExportDetails',
    component: ExportStaffDetailsComponent,
    canActivate: [CMSIsLogin],
  },
  {
    path: 'ScholarShipReport',
    component: ScholarshipReportComponent,
    canActivate: [CMSIsLogin],
  },
  {
    path: 'StaffStatusReport',
    component: StaffStatusReportComponent,
    canActivate: [CMSIsLogin],
  },
  {
    path: 'ApplicationForm',
    component: ApplicationFormComponent,
    canActivate: [CMSIsLogin, cmsroleGuard],
    data: { permission: 'Student' },
  },
  {
    path: 'FeesSettings',
    component: FeesSettingsComponent,
    canActivate: [CMSIsLogin, cmsroleGuard],
    data: { permission: 'Application Settings' },
  },
  {
    path: 'StaffAttandanceSettings',
    component: StaffAttendanceSettingsComponent,
    canActivate: [CMSIsLogin, cmsroleGuard],
    data: { permission: 'Application Settings' },
  },
  {
    path: 'ChangeInstitution',
    component: ChangeInstitutionComponent,
    canActivate: [CMSIsLogin, cmsroleGuard],
    data: { permission: 'Change Institution' },
  },
  {
    path: 'AddAdmin',
    component: AddAdminUserComponent,
    canActivate: [CMSIsLogin, cmsroleGuard],
    data: { permission: 'Application Settings' },
  },
  {
    path: 'TransferCertificateReport',
    component: TransferCertificateReportComponent,
    canActivate: [CMSIsLogin],
  },
];

@NgModule({
  imports: [RouterModule.forChild(CMSroutes)],
  exports: [RouterModule],
})
export class CMSRoutingModule {}
