import { map, catchError, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { UserService } from '../../User.service';
import { inject } from '@angular/core';
import { Cmspermission } from './cmspermission';

export const cmsroleGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
) => {
  const authService = inject(UserService);
  const router = inject(Router);

  const requiredPermission: keyof Cmspermission = route.data['permission'];

  return authService.getPermission().pipe(
    map((response) => {
      const permission: Cmspermission = response.data;
      if (permission[requiredPermission]) {
        return true;
      } else {
        router.navigate(['CMS/no-access']);
        return false;
      }
    }),
    catchError(() => {
      router.navigate(['CMS/no-access']);
      return of(false);
    }),
  );
};
