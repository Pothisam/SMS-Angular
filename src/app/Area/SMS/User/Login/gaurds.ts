import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { GlobalService } from 'src/app/Global/Service/global.service';

export const CMSIsLogin: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
) => {
  const router = inject(Router);
  const globalService = inject(GlobalService);
  if (globalService.GLSG('CMSToken') != null) {
    return true;
  } else {
    router.navigate(['CMS/Login']);
    return false;
  }
};
