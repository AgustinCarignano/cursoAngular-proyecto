import { inject } from '@angular/core';
import { map, take } from 'rxjs';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Paths } from 'src/app/dashboard/enums/paths.enum';
import { Store } from '@ngrx/store';
import { AuthActions } from 'src/app/auth/store';
import { selectAuthInfo } from 'src/app/auth/store/auth.selectors';

export const hasSessionGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const store = inject(Store);

  store.dispatch(AuthActions.loadAuthInfo());
  return store.select(selectAuthInfo).pipe(
    take(1),
    map((user) => {
      return user ? router.createUrlTree([Paths.DASHBOARD]) : true;
    })
  );
};
