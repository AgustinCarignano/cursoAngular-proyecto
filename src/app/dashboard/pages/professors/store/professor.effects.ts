import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { ProfessorActions } from './professor.actions';
import { ProfessorsApiService } from '../services/professors-api.service';
import { ProfessorsService } from '../services/professors.service';

@Injectable()
export class ProfessorEffects {
  loadProfessors$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProfessorActions.loadProfessors),
      switchMap(() =>
        this.professorApiService.getProfessors().pipe(
          map((data) => ProfessorActions.loadProfessorsSuccess({ data })),
          catchError((error) =>
            of(ProfessorActions.loadProfessorsFailure({ error }))
          )
        )
      )
    );
  });

  loadProfessor$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProfessorActions.loadProfessor),
      switchMap(({ professorId }) =>
        this.professorService.getCompleteProfessorDetail(professorId).pipe(
          map((data) => ProfessorActions.loadProfessorSuccess({ data })),
          catchError((error) =>
            of(ProfessorActions.loadProfessorFailure({ error }))
          )
        )
      )
    );
  });

  addProfessor$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProfessorActions.createProfessor),
      switchMap(({ professor }) =>
        this.professorApiService.createProfessor(professor).pipe(
          map((data) => ProfessorActions.loadProfessorsSuccess({ data })),
          catchError((error) =>
            of(ProfessorActions.loadProfessorsFailure({ error }))
          )
        )
      )
    );
  });

  updateProfessor$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProfessorActions.updateProfessor),
      switchMap(({ professor }) =>
        this.professorApiService.updateProfessor(professor).pipe(
          map((data) => ProfessorActions.loadProfessorsSuccess({ data })),
          catchError((error) =>
            of(ProfessorActions.loadProfessorsFailure({ error }))
          )
        )
      )
    );
  });

  deleteProfessor$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProfessorActions.deleteProfessor),
      switchMap(({ professorId }) =>
        this.professorApiService.deleteProfessor(professorId).pipe(
          map((data) => ProfessorActions.loadProfessorsSuccess({ data })),
          catchError((error) =>
            of(ProfessorActions.loadProfessorsFailure({ error }))
          )
        )
      )
    );
  });

  constructor(
    private actions$: Actions,
    private professorApiService: ProfessorsApiService,
    private professorService: ProfessorsService
  ) {}
}
