import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NoaccessComponent } from './Shared/common/noaccess/noaccess.component';

const routes: Routes = [
  { path: 'no-access', component: NoaccessComponent },
  {
    path: 'CMS',
    loadChildren: () => import('./Area/CMS/Shared/Layout/CMS.module').then((x) => x.CMSModule),
  },
  {
    path: 'Staff',
    loadChildren: () => import('./Area/Staff/Shared/Staff.module').then((x) => x.StaffModule),
  },
  {
    path: 'SMS',
    loadChildren: () => import('./School/SMS/Shared/Layout/SMS.module').then((x) => x.SMSModule),
  },
  {
    path: '',
    redirectTo: 'CMS/Login',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
