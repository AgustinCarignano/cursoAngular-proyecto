import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthActions } from './auth.actions';
import { concatMap, map, catchError, of, tap, EMPTY, switchMap } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { Paths } from 'src/app/dashboard/enums/paths.enum';

@Injectable()
export class AuthEffects {
  authUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.loadAuthInfo),
      switchMap(() =>
        this.authService.checkStoredInfo().pipe(
          map((data) => {
            if (data) {
              this.router.navigate([Paths.DASHBOARD]);
              return AuthActions.loadAuthInfoSuccess({ data });
            } else {
              return AuthActions.loadAuthInfoFailure({
                error: {
                  statusCode: 404,
                  statusText: 'No locally stored information found',
                },
              });
            }
          }),
          catchError((error) => of(AuthActions.loadAuthInfoFailure({ error })))
        )
      )
    );
  });

  loginUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.loginUser),
      switchMap((action) =>
        this.authService.storeLogin(action.data).pipe(
          map((user) => AuthActions.loadAuthInfoSuccess({ data: user })),
          catchError((error) => of(AuthActions.loadAuthInfoFailure({ error })))
        )
      )
    );
  });

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router
  ) {}
}
