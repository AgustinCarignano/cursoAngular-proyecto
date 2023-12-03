import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromCourse from '../reducers/course.reducer';

export const selectCourseState = createFeatureSelector<fromCourse.CourseState>(
  fromCourse.courseFeatureKey
);

export const selectCourses = createSelector(
  selectCourseState,
  (state) => state.courses
);

export const selectCourse = createSelector(
  selectCourseState,
  (state) => state.course
);

export const selectIsLoadingCourses = createSelector(
  selectCourseState,
  (state) => state.isLoading
);

export const selectHasErrorCourses = createSelector(
  selectCourseState,
  (state) => state.error
);
