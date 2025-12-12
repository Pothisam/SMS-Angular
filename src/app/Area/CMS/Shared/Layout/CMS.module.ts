import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InstitutionComponent } from '../../Management/Institution/Institution.component';
import { CMSRoutingModule } from './CMS-routing.module';
import { LoginComponent } from '../../User/Login/Login.component';
import { CmsdashboardComponent } from '../../Dashboard/cmsdashboard/cmsdashboard.component';
import { DepartmentComponent } from '../../Management/department/department.component';
import { SectionComponent } from '../../Management/section/section.component';
import { FrameworkModule } from 'src/app/Shared/framework/framework.module';
import { CourseComponent } from '../../Management/course/course.component';
import { BatchComponent } from '../../Management/batch/batch.component';
import { HolidayComponent } from '../../Management/holiday/holiday.component';
import { AddStaffComponent } from '../../Staff/AddStaff/AddStaff.component';
import { ViewStaffListComponent } from '../../Staff/ViewStaffList/ViewStaffList.component';
import { ViewStaffComponent } from '../../Staff/ViewStaff/ViewStaff.component';
import { AddStudentComponent } from '../../Student/AddStudent/AddStudent.component';
import { ViewStudentComponent } from '../../Student/viewStudent/viewStudent.component';
import { ViewStudentListComponent } from '../../Student/ViewStudentList/ViewStudentList.component';
import { ExportStudentDetailsComponent } from '../../Report/ExportStudentDetails/ExportStudentDetails.component';
import { AdminssionReportComponent } from '../../Report/adminssion-report/adminssion-report.component';
import { StudentStatusReportComponent } from '../../Report/student-status-report/student-status-report.component';
import { ConcessionReportComponent } from '../../Report/concession-report/concession-report.component';
import { ExportStaffDetailsComponent } from '../../Report/export-staff-details/export-staff-details.component';
import { ScholarshipReportComponent } from '../../Report/scholarship-report/scholarship-report.component';
import { StaffStatusReportComponent } from '../../Report/staff-status-report/staff-status-report.component';
import { ApplicationFormComponent } from '../../Student/application-form/application-form.component';
import { ApplicationAddFormComponent } from '../../Student/application-form/application-add-form/application-add-form.component';
import { ApplicationEditFormComponent } from '../../Student/application-form/application-edit-form/application-edit-form.component';
import { ChangePasswordComponent } from '../../User/ChangePassword/ChangePassword.component';
import { FeesSettingsComponent } from '../../Application Settings/fees-settings/fees-settings.component';
import { StaffAttendanceSettingsComponent } from '../../Application Settings/Staff Attendance Settings/staff-attendance-settings/staff-attendance-settings.component';
import { ChangeInstitutionComponent } from '../../User/ChangeInstitution/ChangeInstitution.component';
import { AddAdminUserComponent } from '../../Application Settings/add-admin-user/add-admin-user.component';
import { TransferCertificateReportComponent } from '../../Report/transfer-certificate-report/transfer-certificate-report.component';
import { TCPrintComponent } from '../../Report/transfer-certificate-report/tcprint/tcprint.component';

@NgModule({
  declarations: [
    InstitutionComponent,
    LoginComponent,
    CmsdashboardComponent,
    DepartmentComponent,
    CourseComponent,
    SectionComponent,
    BatchComponent,
    HolidayComponent,
    AddStaffComponent,
    ViewStaffListComponent,
    ViewStaffComponent,
    AddStudentComponent,
    ViewStudentListComponent,
    ViewStudentComponent,
    ExportStudentDetailsComponent,
    AdminssionReportComponent,
    StudentStatusReportComponent,
    ConcessionReportComponent,
    ExportStaffDetailsComponent,
    ScholarshipReportComponent,
    StaffStatusReportComponent,
    ChangePasswordComponent,
    ApplicationFormComponent,
    ApplicationAddFormComponent,
    ApplicationEditFormComponent,
    FeesSettingsComponent,
    StaffAttendanceSettingsComponent,
    ChangeInstitutionComponent,
    AddAdminUserComponent,
    TransferCertificateReportComponent,
    TCPrintComponent,
  ],
  imports: [CommonModule, CMSRoutingModule, FrameworkModule],
})
export class CMSModule {}
