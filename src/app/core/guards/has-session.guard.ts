import { inject } from '@angular/core';
import { map } from 'rxjs';
import { CanActivateFn, Router } from '@angular/router';
import { Paths } from 'src/app/dashboard/enums/paths.enum';
import { Store } from '@ngrx/store';
import { AuthActions } from 'src/app/auth/store';
import { selectAuthInfo } from 'src/app/auth/store/auth.selectors';

export const hasSessionGuard: CanActivateFn = () => {
  const router = inject(Router);
  const store = inject(Store);

  store.dispatch(AuthActions.loadAuthInfo());
  return store.select(selectAuthInfo).pipe(
    map((user) => {
      return user ? router.createUrlTree([Paths.DASHBOARD]) : true;
    })
  );
};
