import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromEnrollment from './enrollment.reducer';

export const selectEnrollmentState =
  createFeatureSelector<fromEnrollment.State>(
    fromEnrollment.enrollmentFeatureKey
  );

export const selectIsLoadingEnrollments = createSelector(
  selectEnrollmentState,
  (state) => state.isLoading
);

export const selectHasErrorEnrollments = createSelector(
  selectEnrollmentState,
  (state) => state.error
);

export const selectEnrollments = createSelector(
  selectEnrollmentState,
  (state) => state.enrollments
);

export const selectOneEnrollment = createSelector(
  selectEnrollmentState,
  (state) => state.enrollment
);
