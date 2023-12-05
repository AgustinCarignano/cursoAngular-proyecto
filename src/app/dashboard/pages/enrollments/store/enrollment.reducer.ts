import { createFeature, createReducer, on } from '@ngrx/store';
import { EnrollmentActions } from './enrollment.actions';
import { Enrollment } from '../models';

export const enrollmentFeatureKey = 'enrollment';

export interface State {
  enrollments: Enrollment[] | null;
  enrollment: Enrollment | null;
  isLoading: boolean;
  error: unknown;
}

export const initialState: State = {
  enrollments: null,
  enrollment: null,
  isLoading: false,
  error: undefined,
};

export const reducer = createReducer(
  initialState,
  on(EnrollmentActions.loadEnrollments, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(EnrollmentActions.loadEnrollmentsSuccess, (state, { data }) => ({
    ...state,
    isLoading: false,
    enrollments: data,
  })),
  on(EnrollmentActions.loadEnrollmentsFailure, (state, { error }) => ({
    ...state,
    isLoading: false,
    error,
  })),
  on(EnrollmentActions.loadEnrollment, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(EnrollmentActions.loadEnrollmentSuccess, (state, { data }) => ({
    ...state,
    isLoading: false,
    enrollment: data,
  })),
  on(EnrollmentActions.loadEnrollmentFailure, (state, { error }) => ({
    ...state,
    isLoading: false,
    error,
  })),
  on(EnrollmentActions.createEnrollment, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(EnrollmentActions.deleteEnrollment, (state) => ({
    ...state,
    isLoading: true,
  }))
);

export const enrollmentFeature = createFeature({
  name: enrollmentFeatureKey,
  reducer,
});
