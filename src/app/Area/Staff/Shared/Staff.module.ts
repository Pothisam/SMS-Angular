import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StaffLoginComponent } from '../User/staff-login/staff-login.component';
import { StaffRoutingModule } from './Staff-routing.module';
import { FrameworkModule } from 'src/app/Shared/framework/framework.module';
import { StaffdashboardComponent } from '../Dashboard/staffdashboard/staffdashboard.component';
import { ClassInchargeComponent } from '../Department/ClassIncharge/ClassIncharge.component';
import { CommonFilterComponent } from './CommonFilter/CommonFilter.component';
import { FeesDefaultersReportComponent } from '../Department/FeesDefaultersReport/FeesDefaultersReport.component';
import { IssueTCComponent } from '../Department/IssueTC/IssueTC.component';
import { AddSubjectComponent } from '../Subject/AddSubject/AddSubject.component';
import { AddCourseInstructorComponent } from '../Subject/AddCourseInstructor/AddCourseInstructor.component';
import { StudentTimeTableComponent } from '../TimeTable/StudentTimeTable/StudentTimeTable.component';
import { SubstitutionComponent } from '../TimeTable/Substitution/Substitution.component';
import { MarkEntryComponent } from '../Subject/MarkEntry/MarkEntry.component';
import { MarkreportComponent } from '../Subject/Print/markreport/markreport.component';
import { commonModule } from 'src/app/Shared/common/common.module';
import { MarkReportComponent } from '../Subject/MarkReport/MarkReport.component';
import { MarkAnalysisReportComponent } from '../Subject/MarkAnalysisReport/MarkAnalysisReport.component';
import { MarkAnalysisComponent } from '../Subject/Print/markAnalysis/markAnalysis.component';
import { CommonFilterAdminComponent } from './CommonFilter-Admin/CommonFilter-Admin.component';

@NgModule({
  declarations: [
    StaffLoginComponent,
    StaffdashboardComponent,
    ClassInchargeComponent,
    CommonFilterComponent,
    FeesDefaultersReportComponent,
    IssueTCComponent,
    AddSubjectComponent,
    AddCourseInstructorComponent,
    StudentTimeTableComponent,
    SubstitutionComponent,
    MarkEntryComponent,
    MarkreportComponent,
    MarkReportComponent,
    MarkAnalysisReportComponent,
    MarkAnalysisComponent,
    CommonFilterAdminComponent,
  ],
  imports: [CommonModule, StaffRoutingModule, FrameworkModule, commonModule],
})
export class StaffModule {}
