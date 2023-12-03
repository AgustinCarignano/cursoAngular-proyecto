import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { UserActions } from './user.actions';
import { catchError, concatMap, map, of, switchMap } from 'rxjs';
import { UserApiService } from '../services/user-api.service';

@Injectable()
export class UserEffects {
  loadUsers$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserActions.loadUsers),
      switchMap(() =>
        this.userApiService.getUsers().pipe(
          map((data) => UserActions.loadUsersSuccess({ data })),
          catchError((error) => of(UserActions.loadUsersFailure({ error })))
        )
      )
    );
  });

  loadUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserActions.loadUser),
      switchMap(({ userId }) =>
        this.userApiService.getUser(userId).pipe(
          map((data) => UserActions.loadUserSuccess({ data })),
          catchError((error) => of(UserActions.loadUserFailure({ error })))
        )
      )
    );
  });

  addUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserActions.createUser),
      switchMap(({ user }) =>
        this.userApiService.addUser(user).pipe(
          map((data) => UserActions.loadUsersSuccess({ data })),
          catchError((error) => of(UserActions.loadUsersFailure({ error })))
        )
      )
    );
  });

  updateUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserActions.updateUser),
      switchMap(({ user }) =>
        this.userApiService.updateUser(user).pipe(
          map((data) => UserActions.loadUsersSuccess({ data })),
          catchError((error) => of(UserActions.loadUsersFailure({ error })))
        )
      )
    );
  });

  deleteUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserActions.deleteUser),
      switchMap(({ userId }) =>
        this.userApiService.deleteUser(userId).pipe(
          map((data) => UserActions.loadUsersSuccess({ data })),
          catchError((error) => of(UserActions.loadUsersFailure({ error })))
        )
      )
    );
  });

  constructor(
    private actions$: Actions,
    private userApiService: UserApiService
  ) {}
}
