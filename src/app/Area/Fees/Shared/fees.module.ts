import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FrameworkModule } from 'src/app/Shared/framework/framework.module';
import { FeesRoutingModule } from './fees-routing.module';
import { LoginComponent } from '../User/Login/Login.component';
import { FeesDashboardComponent } from '../Dashboard/feesDashboard/feesDashboard.component';
import { AddFeesTypeComponent } from '../ManageFees/AddFeesType/AddFeesType.component';
import { GenerateFeesComponent } from '../ManageFees/GenerateFees/GenerateFees.component';

@NgModule({
  declarations: [
    LoginComponent,
    FeesDashboardComponent,
    AddFeesTypeComponent,
    GenerateFeesComponent,
  ],
  imports: [CommonModule, FeesRoutingModule, FrameworkModule],
})
export class FeesModule {}
