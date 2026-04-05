import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FeesDashboardComponent } from '../Dashboard/feesDashboard/feesDashboard.component';
import { LoginComponent } from '../User/Login/Login.component';
import { AddFeesTypeComponent } from '../ManageFees/AddFeesType/AddFeesType.component';
import { GenerateFeesComponent } from '../ManageFees/GenerateFees/GenerateFees.component';
import { ApproveFeesComponent } from '../ManageFees/ApproveFees/ApproveFees.component';
import { ViewFeesListComponent } from '../CollectFees/ViewFeesList/ViewFeesList.component';
import { ViewDetailComponent } from '../CollectFees/ViewDetail/ViewDetail.component';
import { DateWiseReportComponent } from '../Report/DateWiseReport/DateWiseReport.component';
import { PrintCashReceiptComponent } from '../Report/PrintCashReceipt/PrintCashReceipt.component';
import { GentrateConcessionComponent } from '../ManageFees/GentrateConcession/GentrateConcession.component';

const feesroutes: Routes = [
  {
    path: '',
    component: LoginComponent,
  },
  {
    path: 'Login',
    component: LoginComponent,
  },
  {
    path: 'Dashboard',
    component: FeesDashboardComponent,
  },
  {
    path: 'AddFeesType',
    component: AddFeesTypeComponent,
  },
  {
    path: 'GenerateFees',
    component: GenerateFeesComponent,
  },
  {
    path: 'ApproveFees',
    component: ApproveFeesComponent,
  },
  {
    path: 'ViewFees',
    component: ViewFeesListComponent,
  },
  {
    path: 'ViewDetails',
    component: ViewDetailComponent,
  },
  {
    path: 'DateWiseReport',
    component: DateWiseReportComponent,
  },
  {
    path: 'PrintCashReceipt',
    component: PrintCashReceiptComponent,
    data: { isprint: true },
  },
  {
    path: 'GenerateConcession',
    component: GentrateConcessionComponent,
  },
];
@NgModule({
  imports: [RouterModule.forChild(feesroutes)],
  exports: [RouterModule],
})
export class FeesRoutingModule {}
