import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FrameworkModule } from 'src/app/Shared/framework/framework.module';
import { FeesRoutingModule } from './fees-routing.module';
import { LoginComponent } from '../User/Login/Login.component';
import { FeesDashboardComponent } from '../Dashboard/feesDashboard/feesDashboard.component';
import { AddFeesTypeComponent } from '../ManageFees/AddFeesType/AddFeesType.component';
import { GenerateFeesComponent } from '../ManageFees/GenerateFees/GenerateFees.component';
import { ApproveFeesComponent } from '../ManageFees/ApproveFees/ApproveFees.component';
import { ViewFeesListComponent } from '../CollectFees/ViewFeesList/ViewFeesList.component';
import { ViewDetailComponent } from '../CollectFees/ViewDetail/ViewDetail.component';
import { DateWiseReportComponent } from '../Report/DateWiseReport/DateWiseReport.component';
import { PrintCashReceiptComponent } from '../Report/PrintCashReceipt/PrintCashReceipt.component';
import { SharedCommonModule } from 'src/app/Shared/common/common.module';
import { GentrateConcessionComponent } from '../ManageFees/GentrateConcession/GentrateConcession.component';

@NgModule({
  declarations: [
    LoginComponent,
    FeesDashboardComponent,
    AddFeesTypeComponent,
    GenerateFeesComponent,
    ApproveFeesComponent,
    ViewFeesListComponent,
    ViewDetailComponent,
    DateWiseReportComponent,
    PrintCashReceiptComponent,
    GentrateConcessionComponent,
  ],
  imports: [CommonModule, FeesRoutingModule, FrameworkModule, SharedCommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class FeesModule {}
