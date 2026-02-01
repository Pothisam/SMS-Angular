import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FeesDashboardComponent } from '../Dashboard/feesDashboard/feesDashboard.component';
import { LoginComponent } from '../User/Login/Login.component';

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
];
@NgModule({
  imports: [RouterModule.forChild(feesroutes)],
  exports: [RouterModule],
})
export class FeesRoutingModule {}
