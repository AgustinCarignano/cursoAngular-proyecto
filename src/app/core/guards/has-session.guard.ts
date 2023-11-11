import { inject } from '@angular/core';
import { map, take } from 'rxjs';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Paths } from 'src/app/dashboard/enums/paths.enum';

export const hasSessionGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);

  return authService.localSotageInfo.pipe(
    take(1),
    map((user) => {
      return user ? router.createUrlTree([Paths.DASHBOARD]) : true;
    })
  );
};
