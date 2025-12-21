import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from '../../User/Login/Login.component';
import { FrameworkModule } from 'src/app/Shared/framework/framework.module';
import { SMSRoutingModule } from './SMS-routing.module';
import { InstitutionComponent } from '../../Management/Institution/Institution.component';
import { ClassComponent } from '../../Management/Class/Class.component';
import { ClassSectionComponent } from '../../Management/ClassSection/ClassSection.component';
import { AcademicYearComponent } from '../../Management/AcademicYear/AcademicYear.component';

@NgModule({
  declarations: [
    LoginComponent,
    InstitutionComponent,
    ClassComponent,
    ClassSectionComponent,
    AcademicYearComponent,
  ],
  imports: [CommonModule, SMSRoutingModule, FrameworkModule],
})
export class SMSModule {}
