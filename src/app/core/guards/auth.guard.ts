import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, take } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { AuthActions } from 'src/app/auth/store';
import { selectAuthInfo } from 'src/app/auth/store/auth.selectors';
import { Paths } from 'src/app/dashboard/enums/paths.enum';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const store = inject(Store);

  store.dispatch(AuthActions.loadAuthInfo());
  return store.select(selectAuthInfo).pipe(
    take(1),
    map((user) => {
      return user ? true : router.createUrlTree([Paths.AUTH, Paths.LOGIN]);
    })
  );
};
