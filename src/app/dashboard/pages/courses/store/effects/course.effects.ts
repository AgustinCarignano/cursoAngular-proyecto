import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap, tap, switchMap } from 'rxjs/operators';
import { EMPTY, of } from 'rxjs';
import { CourseActions } from './../actions/course.actions';
import { CourseApiService } from '../../services/course-api.service';
import { EditionsApiService } from '../../services/editions-api.service';

@Injectable()
export class CourseEffects {
  loadCourses$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CourseActions.loadCourses),
      switchMap(() =>
        this.courseApiService.getCourses().pipe(
          map((data) => CourseActions.loadCoursesSuccess({ data })),
          catchError((error) => of(CourseActions.loadCoursesFailure({ error })))
        )
      )
    );
  });

  loadCourse$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CourseActions.loadCourse),
      switchMap(({ courseId }) =>
        this.courseApiService.getOneCourse(courseId).pipe(
          map((data) => CourseActions.loadCourseSuccess({ data })),
          catchError((error) => of(CourseActions.loadCourseFailure({ error })))
        )
      )
    );
  });

  addCourse$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CourseActions.createCourse),
      switchMap(({ course }) =>
        this.courseApiService.createCourse(course).pipe(
          map((data) => CourseActions.loadCoursesSuccess({ data })),
          catchError((error) => of(CourseActions.loadCoursesFailure({ error })))
        )
      )
    );
  });

  updateCourse$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CourseActions.updateCourse),
      switchMap(({ course }) =>
        this.courseApiService.updateCourse(course).pipe(
          map((data) => CourseActions.loadCoursesSuccess({ data })),
          catchError((error) => of(CourseActions.loadCoursesFailure({ error })))
        )
      )
    );
  });

  deleteCourse$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CourseActions.deleteCourse),
      switchMap(({ courseId }) =>
        this.courseApiService.deleteCourse(courseId).pipe(
          tap(() => this.editionApiService.deleteEditionByCourseId(courseId)),
          map((data) => CourseActions.loadCoursesSuccess({ data })),
          catchError((error) => of(CourseActions.loadCoursesFailure({ error })))
        )
      )
    );
  });

  constructor(
    private actions$: Actions,
    private courseApiService: CourseApiService,
    private editionApiService: EditionsApiService
  ) {}
}
