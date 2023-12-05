import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { CourseEdition } from '../../models';

export const EditionActions = createActionGroup({
  source: 'Edition',
  events: {
    'Load Editions': emptyProps(),
    'Load Editions Success': props<{ data: CourseEdition[] }>(),
    'Load Editions Failure': props<{ error: unknown }>(),
    'Load Course Editions': props<{ courseId: number }>(),
    'Load Course Editions Success': props<{ data: CourseEdition[] }>(),
    'Load Course Editions Failure': props<{ error: unknown }>(),
    'Load Edition': props<{ editionId: number }>(),
    'Load Edition Success': props<{ data: CourseEdition }>(),
    'Load Edition Failure': props<{ error: unknown }>(),
    'Create Edition': props<{ edition: CourseEdition }>(),
    'Update Edition': props<{ edition: CourseEdition }>(),
    'Delete Edition': props<{ editionId: number }>(),
  },
});
