import { createFeature, createReducer, on } from '@ngrx/store';
import { ProfessorActions } from './professor.actions';
import { Professor } from '../models';

export const professorFeatureKey = 'professor';

export interface State {
  professors: Professor[] | null;
  professor: Professor | null;
  isLoading: boolean;
  error: unknown;
}

export const initialState: State = {
  professors: null,
  professor: null,
  isLoading: false,
  error: undefined,
};

export const reducer = createReducer(
  initialState,
  on(ProfessorActions.loadProfessors, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(ProfessorActions.loadProfessorsSuccess, (state, { data }) => ({
    ...state,
    isLoading: false,
    professors: data,
  })),
  on(ProfessorActions.loadProfessorsFailure, (state, { error }) => ({
    ...state,
    isLoading: false,
    error,
  })),
  on(ProfessorActions.loadProfessor, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(ProfessorActions.loadProfessorSuccess, (state, { data }) => ({
    ...state,
    isLoading: false,
    professor: data,
  })),
  on(ProfessorActions.loadProfessorFailure, (state, { error }) => ({
    ...state,
    isLoading: false,
    error,
  })),
  on(ProfessorActions.createProfessor, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(ProfessorActions.updateProfessor, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(ProfessorActions.deleteProfessor, (state) => ({
    ...state,
    isLoading: true,
  }))
);

export const professorFeature = createFeature({
  name: professorFeatureKey,
  reducer,
});
