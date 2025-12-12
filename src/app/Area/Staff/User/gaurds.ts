import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { GlobalService } from 'src/app/Global/Service/global.service';
import { StaffService } from './Staff.service';
import { StaffLoginDetails } from 'src/app/Modules/Staff/User/StaffDetails';
import { catchError, map, of } from 'rxjs';

export const StaffIsLogin: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
) => {
  const router = inject(Router);
  const globalService = inject(GlobalService);
  if (globalService.GLSG('StaffToken') != null) {
    return true;
  } else {
    router.navigate(['Staff/Login']);
    return false;
  }
};
export const HODGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
) => {
  const authService = inject(StaffService);
  const router = inject(Router);
  let staffLoginDetails: StaffLoginDetails;
  //const desigination = route.data['desigination'];

  return authService.getStaffDetails().pipe(
    map((response) => {
      staffLoginDetails = new StaffLoginDetails(response.data);
      if (staffLoginDetails.designationCode === 101) {
        return true;
      } else {
        router.navigate(['Staff/no-access']);
        return false;
      }
    }),
    catchError(() => {
      router.navigate(['Staff/no-access']);
      return of(false);
    }),
  );
};
