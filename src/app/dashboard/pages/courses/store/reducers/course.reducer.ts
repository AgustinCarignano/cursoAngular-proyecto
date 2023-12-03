import { createReducer, on } from '@ngrx/store';
import { CourseActions } from '../actions/course.actions';
import { Course } from '../../models';

export const courseFeatureKey = 'course';

export interface CourseState {
  courses: Course[] | null;
  course: Course | null;
  isLoading: boolean;
  error: unknown;
}

export const initialCourseState: CourseState = {
  courses: null,
  course: null,
  isLoading: false,
  error: undefined,
};

export const courseReducer = createReducer(
  initialCourseState,
  on(CourseActions.loadCourses, (state) => ({ ...state, isLoading: true })),
  on(CourseActions.loadCoursesSuccess, (state, { data }) => ({
    ...state,
    isLoading: false,
    courses: data,
  })),
  on(CourseActions.loadCoursesFailure, (state, { error }) => ({
    ...state,
    isLoading: false,
    error,
  })),
  on(CourseActions.loadCourse, (state) => ({ ...state, isLoading: true })),
  on(CourseActions.loadCourseSuccess, (state, { data }) => ({
    ...state,
    isLoading: false,
    course: data,
  })),
  on(CourseActions.loadCourseFailure, (state, { error }) => ({
    ...state,
    isLoading: false,
    error,
  })),
  on(CourseActions.createCourse, (state) => ({ ...state, isLoading: true })),
  on(CourseActions.updateCourse, (state) => ({ ...state, isLoading: true })),
  on(CourseActions.deleteCourse, (state) => ({ ...state, isLoading: true })),
  on(CourseActions.cleanCourseState, () => initialCourseState)
);
