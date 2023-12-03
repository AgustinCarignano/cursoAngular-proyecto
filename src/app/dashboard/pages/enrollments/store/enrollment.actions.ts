import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Enrollment } from '../models';

export const EnrollmentActions = createActionGroup({
  source: 'Enrollment',
  events: {
    'Load Enrollments': emptyProps(),
    'Load Enrollments Success': props<{ data: Enrollment[] }>(),
    'Load Enrollments Failure': props<{ error: unknown }>(),
    'Load Enrollment': props<{ enrollmentId: number }>(),
    'Load Enrollment Success': props<{ data: Enrollment }>(),
    'Load Enrollment Failure': props<{ error: unknown }>(),
    'Create Enrollment': props<{ enrollment: Enrollment }>(),
    'Delete Enrollment': props<{ enrollmentId: number }>(),
  },
});
