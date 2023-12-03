import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { ProfessorActions } from './professor.actions';
import { ProfessorsApiService } from '../services/professors-api.service';

@Injectable()
export class ProfessorEffects {
  loadProfessors$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProfessorActions.loadProfessors),
      concatMap(() =>
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
      concatMap(({ professorId }) =>
        this.professorApiService.getOneProfessor(professorId).pipe(
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
      concatMap(({ professor }) =>
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
      concatMap(({ professor }) =>
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
      concatMap(({ professorId }) =>
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
    private professorApiService: ProfessorsApiService
  ) {}
}
