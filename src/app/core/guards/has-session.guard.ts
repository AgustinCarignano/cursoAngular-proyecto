import { inject } from '@angular/core';
import { map, skip } from 'rxjs';
import { CanActivateFn, Router } from '@angular/router';
import { Paths } from 'src/app/dashboard/enums/paths.enum';
import { Store } from '@ngrx/store';
import { AuthActions } from 'src/app/auth/store';
import { selectAuthInfo } from 'src/app/auth/store/auth.selectors';
import { AuthService } from 'src/app/auth/services/auth.service';

export const hasSessionGuard: CanActivateFn = () => {
  const router = inject(Router);
  const store = inject(Store);
  const authService = inject(AuthService);

  store.dispatch(AuthActions.loadAuthInfo());
  let step = 0;
  if (authService.getTokenvalue()) step++;
  return store.select(selectAuthInfo).pipe(
    skip(step),
    map((user) => {
      return user ? router.createUrlTree([Paths.DASHBOARD]) : true;
    })
  );
};
