import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { Observable, EMPTY, of } from 'rxjs';
import { EnrollmentActions } from './enrollment.actions';
import { EnrollmentApiService } from '../services/enrollment-api.service';

@Injectable()
export class EnrollmentEffects {
  loadEnrollments$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(EnrollmentActions.loadEnrollments),
      concatMap(() =>
        this.enrollmentApiService.getEnrollments().pipe(
          map((data) => EnrollmentActions.loadEnrollmentsSuccess({ data })),
          catchError((error) =>
            of(EnrollmentActions.loadEnrollmentsFailure({ error }))
          )
        )
      )
    );
  });

  loadEnrollment$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(EnrollmentActions.loadEnrollment),
      concatMap(({ enrollmentId }) =>
        this.enrollmentApiService.getOneEnrollment(enrollmentId).pipe(
          map((data) => EnrollmentActions.loadEnrollmentSuccess({ data })),
          catchError((error) =>
            of(EnrollmentActions.loadEnrollmentFailure({ error }))
          )
        )
      )
    );
  });

  addEnrollment$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(EnrollmentActions.createEnrollment),
      concatMap(({ enrollment }) =>
        this.enrollmentApiService.addEnrollment(enrollment).pipe(
          map((data) => EnrollmentActions.loadEnrollmentsSuccess({ data })),
          catchError((error) =>
            of(EnrollmentActions.loadEnrollmentsFailure({ error }))
          )
        )
      )
    );
  });

  deleteEnrollment$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(EnrollmentActions.deleteEnrollment),
      concatMap(({ enrollmentId }) =>
        this.enrollmentApiService.deleteEnrollment(enrollmentId).pipe(
          map((data) => EnrollmentActions.loadEnrollmentsSuccess({ data })),
          catchError((error) =>
            of(EnrollmentActions.loadEnrollmentsFailure({ error }))
          )
        )
      )
    );
  });

  constructor(
    private actions$: Actions,
    private enrollmentApiService: EnrollmentApiService
  ) {}
}
