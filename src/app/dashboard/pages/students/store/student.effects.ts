import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  catchError,
  map,
  concatMap,
  switchMap,
  tap,
  exhaustMap,
  concatAll,
} from 'rxjs/operators';
import { combineLatest, forkJoin, of } from 'rxjs';
import { StudentActions } from './student.actions';
import { StudentApiService } from '../services/student-api.service';
import { StudentsService } from '../services/student.service';
import { EnrollmentService } from '../../enrollments/services/enrollment.service';

@Injectable()
export class StudentEffects {
  loadStudents$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(StudentActions.loadStudents),
      switchMap(() =>
        this.studentApiService.getStudents().pipe(
          map((data) => StudentActions.loadStudentsSuccess({ data })),
          catchError((error) =>
            of(StudentActions.loadStudentsFailure({ error }))
          )
        )
      )
    );
  });

  loadStudent$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(StudentActions.loadStudent),
      switchMap(({ studentId }) =>
        this.studentService.getCompleteStudentDetail(studentId).pipe(
          map((data) => StudentActions.loadStudentSuccess({ data })),
          catchError((error) =>
            of(StudentActions.loadStudentFailure({ error }))
          )
        )
      )
    );
  });

  addStudent$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(StudentActions.createStudent),
      switchMap(({ student }) =>
        this.studentApiService.createStudent(student).pipe(
          map((data) => StudentActions.loadStudentsSuccess({ data })),
          catchError((error) =>
            of(StudentActions.loadStudentsFailure({ error }))
          )
        )
      )
    );
  });

  updateStudent$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(StudentActions.updateStudent),
      switchMap(({ student }) =>
        this.studentApiService.updateStudent(student).pipe(
          map((data) => StudentActions.loadStudentsSuccess({ data })),
          catchError((error) =>
            of(StudentActions.loadStudentsFailure({ error }))
          )
        )
      )
    );
  });

  deleteStudent$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(StudentActions.deleteStudent),
      switchMap(({ studentId }) =>
        this.studentApiService.deleteStudent(studentId).pipe(
          map((data) => StudentActions.loadStudentsSuccess({ data })),
          catchError((error) =>
            of(StudentActions.loadStudentsFailure({ error }))
          )
        )
      )
    );
  });

  constructor(
    private actions$: Actions,
    private studentApiService: StudentApiService,
    private studentService: StudentsService
  ) {}
}
