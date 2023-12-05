import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromProfessor from './professor.reducer';

export const selectProfessorState = createFeatureSelector<fromProfessor.State>(
  fromProfessor.professorFeatureKey
);

export const selectIsLoadingProfessors = createSelector(
  selectProfessorState,
  (state) => state.isLoading
);

export const selectHasErrorProfessors = createSelector(
  selectProfessorState,
  (state) => state.error
);

export const selectProfessors = createSelector(
  selectProfessorState,
  (state) => state.professors
);

export const selectOneProfessor = createSelector(
  selectProfessorState,
  (state) => state.professor
);
