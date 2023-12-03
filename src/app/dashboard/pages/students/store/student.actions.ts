import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Student } from '../models/student.model';

export const StudentActions = createActionGroup({
  source: 'Student',
  events: {
    'Load Students': emptyProps(),
    'Load Students Success': props<{ data: Student[] }>(),
    'Load Students Failure': props<{ error: unknown }>(),
    'Load Student': props<{ studentId: number }>(),
    'Load Student Success': props<{ data: Student }>(),
    'Load Student Failure': props<{ error: unknown }>(),
    'Create Student': props<{ student: Student }>(),
    'Update Student': props<{ student: Student }>(),
    'Delete Student': props<{ studentId: number }>(),
  },
});
