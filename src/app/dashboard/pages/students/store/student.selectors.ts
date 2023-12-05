import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromStudent from './student.reducer';

export const selectStudentState = createFeatureSelector<fromStudent.State>(
  fromStudent.studentFeatureKey
);

export const selectIsLoadingStudents = createSelector(
  selectStudentState,
  (state) => state.isLoading
);

export const selectHasErrorStudents = createSelector(
  selectStudentState,
  (state) => state.error
);

export const selectStudents = createSelector(
  selectStudentState,
  (state) => state.students
);

export const selectOneStudent = createSelector(
  selectStudentState,
  (state) => state.student
);
