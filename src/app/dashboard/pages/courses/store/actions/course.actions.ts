import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Course } from '../../models';

export const CourseActions = createActionGroup({
  source: 'Course',
  events: {
    'Load Courses': emptyProps(),
    'Load Courses Success': props<{ data: Course[] }>(),
    'Load Courses Failure': props<{ error: unknown }>(),
    'Load Course': props<{ courseId: number }>(),
    'Load Course Success': props<{ data: Course }>(),
    'Load Course Failure': props<{ error: unknown }>(),
    'Create Course': props<{ course: Course }>(),
    'Update Course': props<{ course: Course }>(),
    'Delete Course': props<{ courseId: number }>(),
    'Clean Course State': emptyProps(),
  },
});
