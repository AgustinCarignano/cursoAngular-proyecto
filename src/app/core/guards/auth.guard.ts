import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { map, take } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Paths } from 'src/app/dashboard/enums/paths.enum';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);

  return authService.localSotageInfo.pipe(
    take(1),
    map((user) => {
      return user ? true : router.createUrlTree([Paths.AUTH, Paths.LOGIN]);
    })
  );
};
