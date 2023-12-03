import { createReducer, on } from '@ngrx/store';
import { EditionActions } from '../actions/edition.actions';
import { CourseEdition } from '../../models';

export const editionFeatureKey = 'edition';

export interface EditionState {
  editions: CourseEdition[] | null;
  courseEditions: CourseEdition[] | null;
  edition: CourseEdition | null;
  isLoading: boolean;
  error: unknown;
}

export const initialEditionState: EditionState = {
  editions: null,
  courseEditions: null,
  edition: null,
  isLoading: false,
  error: undefined,
};

export const editionReducer = createReducer(
  initialEditionState,
  on(EditionActions.loadEditions, (state) => ({ ...state, isLoading: true })),
  on(EditionActions.loadEditionsSuccess, (state, { data }) => ({
    ...state,
    isLoading: false,
    editions: data,
  })),
  on(EditionActions.loadEditionsFailure, (state, { error }) => ({
    ...state,
    isLoading: false,
    error,
  })),
  on(EditionActions.loadCourseEditions, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(EditionActions.loadCourseEditionsSuccess, (state, { data }) => ({
    ...state,
    isLoading: false,
    courseEditions: data,
  })),
  on(EditionActions.loadCourseEditionsFailure, (state, { error }) => ({
    ...state,
    isLoading: false,
    error,
  })),
  on(EditionActions.loadEdition, (state) => ({ ...state, isLoading: true })),
  on(EditionActions.loadEditionSuccess, (state, { data }) => ({
    ...state,
    isLoading: false,
    edition: data,
  })),
  on(EditionActions.loadEditionFailure, (state, { error }) => ({
    ...state,
    isLoading: false,
    error,
  })),
  on(EditionActions.createEdition, (state) => ({ ...state, isLoading: true })),
  on(EditionActions.updateEdition, (state) => ({ ...state, isLoading: true })),
  on(EditionActions.deleteEdition, (state) => ({ ...state, isLoading: true }))
);
