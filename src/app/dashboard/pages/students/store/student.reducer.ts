import { createFeature, createReducer, on } from '@ngrx/store';
import { StudentActions } from './student.actions';
import { Student } from '../models/student.model';

export const studentFeatureKey = 'student';

export interface State {
  students: Student[] | null;
  student: Student | null;
  isLoading: boolean;
  error: unknown;
}

export const initialState: State = {
  students: null,
  student: null,
  isLoading: false,
  error: undefined,
};

export const reducer = createReducer(
  initialState,
  on(StudentActions.loadStudents, (state) => ({ ...state, isLoading: true })),
  on(StudentActions.loadStudentsSuccess, (state, { data }) => ({
    ...state,
    isLoading: false,
    students: data,
  })),
  on(StudentActions.loadStudentsFailure, (state, { error }) => ({
    ...state,
    isLoading: false,
    error,
  })),
  on(StudentActions.loadStudent, (state) => ({ ...state, isLoading: true })),
  on(StudentActions.loadStudentSuccess, (state, { data }) => ({
    ...state,
    isLoading: false,
    student: data,
  })),
  on(StudentActions.loadStudentFailure, (state, { error }) => ({
    ...state,
    isLoading: false,
    error,
  })),
  on(StudentActions.createStudent, (state) => ({ ...state, isLoading: true })),
  on(StudentActions.updateStudent, (state) => ({ ...state, isLoading: true })),
  on(StudentActions.deleteStudent, (state) => ({ ...state, isLoading: true }))
);
