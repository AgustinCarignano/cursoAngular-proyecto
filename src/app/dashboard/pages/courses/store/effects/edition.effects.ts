import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  catchError,
  map,
  concatMap,
  switchMap,
  tap,
  mergeMap,
} from 'rxjs/operators';
import { forkJoin, of } from 'rxjs';
import { EditionActions } from './../actions/edition.actions';
import { EditionsApiService } from '../../services/editions-api.service';
import { EnrollmentApiService } from '../../../enrollments/services/enrollment-api.service';
import { CourseActions } from '../actions/course.actions';
import { CourseApiService } from '../../services/course-api.service';

@Injectable()
export class EditionEffects {
  loadEditions$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(EditionActions.loadEditions),
      concatMap(() =>
        this.editionApiService.getPopulatedEditions().pipe(
          map((data) => EditionActions.loadEditionsSuccess({ data })),
          catchError((error) =>
            of(EditionActions.loadEditionsFailure({ error }))
          )
        )
      )
    );
  });

  loadCourseEditions$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(EditionActions.loadCourseEditions),
      concatMap(({ courseId }) =>
        this.editionApiService.getEditionsByCourseId(courseId).pipe(
          map((data) => EditionActions.loadCourseEditionsSuccess({ data })),
          catchError((error) =>
            of(EditionActions.loadCourseEditionsFailure({ error }))
          )
        )
      )
    );
  });

  loadEdition$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(EditionActions.loadEdition),
      concatMap(({ editionId }) =>
        this.editionApiService.getPopulatedEdition(editionId).pipe(
          map((data) => EditionActions.loadEditionSuccess({ data })),
          catchError((error) =>
            of(EditionActions.loadEditionFailure({ error }))
          )
        )
      )
    );
  });

  addEdition$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(EditionActions.createEdition),
      concatMap(({ edition }) =>
        this.editionApiService.createCourseEdition(edition).pipe(
          switchMap((data) => [
            EditionActions.loadEditionsSuccess({ data }),
            CourseActions.loadCourse({ courseId: edition.courseId }),
          ]),
          catchError((error) =>
            of(EditionActions.loadEditionsFailure({ error }))
          )
        )
      )
    );
  });

  addEditionSuccess$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(EditionActions.loadEditionSuccess),
      concatMap(() => of(CourseActions.cleanCourseState()))
    );
  });

  updateEdition$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(EditionActions.updateEdition),
      concatMap(({ edition }) =>
        this.editionApiService.editCourseEdition(edition).pipe(
          map((data) => EditionActions.loadEditionsSuccess({ data })),
          catchError((error) =>
            of(EditionActions.loadEditionsFailure({ error }))
          )
        )
      )
    );
  });

  deleteEdition$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(EditionActions.deleteEdition),
      concatMap(({ editionId }) =>
        this.editionApiService.deleteCourseEdition(editionId).pipe(
          tap(() =>
            this.enrollmentApiService.deleteEnrollmentByEditionId(editionId)
          ),
          map((data) => EditionActions.loadEditionsSuccess({ data })),
          catchError((error) =>
            of(EditionActions.loadEditionsFailure({ error }))
          )
        )
      )
    );
  });

  constructor(
    private actions$: Actions,
    private enrollmentApiService: EnrollmentApiService,
    private editionApiService: EditionsApiService,
    private courseApiService: CourseApiService
  ) {}
}
