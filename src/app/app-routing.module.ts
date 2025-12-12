import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NoaccessComponent } from './Shared/common/noaccess/noaccess.component';

const routes: Routes = [
  { path: 'no-access', component: NoaccessComponent },
  {
    path: 'SMS',
    // loadChildren: () => import('./Area/SMS/Shared/Layout/SMS.module').then((x) => x.SMSModule),
  },
  {
    path: '',
    redirectTo: 'SMS/Login',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
